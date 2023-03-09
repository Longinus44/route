import { dbconfig } from "../sqlConfig/sqlConfig";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const check_token = (req: any, res: Response, next: NextFunction) => {
  const secretKey = dbconfig.jwtkey;
  try {
    const token = req.header("Auth-token");
    if (!token) {
      return res.send("access denied");
    } else {
      const user = jwt.verify(token, secretKey);
      if (user) {
        //console.log(user);
        req["user_id"] = (user as any)["user_id"];
        next();
      }
    }
  } catch (err: any) {
    return res.send(err.message);
  }
};
