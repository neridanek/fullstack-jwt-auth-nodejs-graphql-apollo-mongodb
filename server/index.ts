import express, { Request, Response, Express, NextFunction } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./graphql/UserResolver";
import { typeDefs } from "./graphql/typeDefs";
import jwt from "jsonwebtoken";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const app: Express = express();

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  console.log(resolvers.Mutation.register);
  apolloServer.applyMiddleware({ app });
}

startServer();

app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log("Server is running"));
