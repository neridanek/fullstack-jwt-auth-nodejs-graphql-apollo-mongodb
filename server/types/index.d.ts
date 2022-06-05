import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { userDocument } from "../model/User";

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}
