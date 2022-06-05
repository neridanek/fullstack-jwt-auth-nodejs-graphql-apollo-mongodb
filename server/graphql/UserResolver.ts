import User from "../model/User";
import { ResolverMap } from "./resolvers-types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const resolvers: ResolverMap = {
  Query: {
    user: async (_, args, { req, res }) => {
      console.log(req.headers);
      const token = req.getHeader("auth-token"); //?? undefined
      const decoded = jwt.decode(token);
      console.log(token);
      console.log(decoded);

      if (!token) return res.status(401).send("Access Denieeed");
      const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
      console.log("ok", verified);
      if (verified) {
        const user = await User.findOne({ _id: decoded });
        console.log("user", user);
        return user;
      } else {
        res.status(400).send("Invalid Token");
      }
    },
    users: async (_, args, context) => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    register: async (_, { email, password }, { req, res }) => {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email: email,
        password: hashPassword,
      });
      try {
        await user.save();
      } catch (err) {
        res.status(400).send(err);
      }
      return user;
    },
    login: async (_, { email, password }, { req, res }) => {
      const user = await User.findOne({
        email: email,
      });

      if (!user) return res.status(400).send("Email is not found");
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return res.status(400).send("Invalid password");

      const token = await jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET!
      );
      req.setHeader("auth-token", token); //??nie ustawia sie
    },
  },
};
