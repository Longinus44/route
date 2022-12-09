"use strict";
// import jwt, { Secret, JwtPayload } from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// export const SECRET_KEY: Secret = "your-secret-key-here";
// export interface CustomRequest extends Request {
//   token: string | JwtPayload;
// }
// export const auth =  (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       throw new Error();
//     }
//     const decoded = jwt.verify(token, SECRET_KEY);
//     (req as CustomRequest).token = decoded;
//     next();
//   } catch (err) {
//     res.status(401).send("Please authenticate");
//   }
// };
// // require("dotenv").config();
// // import { sConfig } from "../serverConfig/config";
// // import Express, { Request, Response, NextFunction } from "express";
// // import user2 from "../serverroute/user2";
// // // import { token } from "morgan";
// // import jwt from "jsonwebtoken";
// // const router = Express.Router();
// // router.use(Express.json());
// // module.exports = (req: Request, res: Response, Next: any) => {
// //   try {
// //     const token = String(req.headers.authorization).split(" ")[1];
// //     // console.log(token);
// //     const decode = jwt.verify(token, sConfig.JWTKEY);
// //     req.header = decode;
// //     Next();
// //   } catch (err) {
// //     console.log(err);
// //     res.send("auth failed bbb");
// //   }
// // };
