import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const check_auth = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = "secretAccessKey";

  const hash = jwt.sign("chijioke", secretKey);
  console.log(hash);

  let decode = jwt.verify(hash, secretKey);
  console.log(decode);
  next();
};
//         res.status(200).json({
//     req.userId = decode
//     next();
//     }
//     catch(err){
//         console.log(err)
//     }

// }
export { check_auth };
