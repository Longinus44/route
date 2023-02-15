"use strict";
// import { Request, Response, NextFunction } from "express";
// import Jwt from "jsonwebtoken";
// // const token = Jwt.sign()
// export const Auth = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       throw new Error();
//     }
//     next();
//   } catch (err) {
//     res.status(401).send("Please authenticate");
//   }
// };
// const auth = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header("Authorization");
//     if (!token) {
//       throw new Error();
//     }
//     next();
//   } catch (err) {
//     res.status(401).send("Please authenticate");
//   }
// };
