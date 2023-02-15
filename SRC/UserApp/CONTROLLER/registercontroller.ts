import Express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { userModel as User } from "../MODEL/userModel";
import multer, { diskStorage } from "multer";
import path from "path";

const router = Express.Router();

const storage = diskStorage({
  destination: "../upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname} ${new Date()} ${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export const registerUser = (req: Request, res: Response) => {
  const {
    email,
    phone,
    firstname,
    lastname,
    othername,
    date_of_birth,
    state_of_origin,
  } = req.body;
  User.find({ email, phone }).then((user) => {
    if (user.length > 0) {
      res.status(409).send("email/number already exists");
    } else {
      upload.single("image");
      const file = req.file?.filename;
      bcrypt.hash(req.body.password, 5, (err, hash) => {
        if (err) {
          console.log(err.message);
        } else {
          const user = new User({
            firstname,
            lastname,
            othername,
            email,
            password: hash,
            date_of_birth,
            state_of_origin,
            phone,
            image: {
              data: req.file?.filename,
              contentType: "image/jpeg",
              url: `http://localhost:7070/upload/image/${file}`,
            },
          });
          user
            .save()
            .then((user) => {
              const response = {
                user: { user },
              };
              res.send(response);
            })
            .catch((err) => {
              res.status(400).send(err.message);
            });
        }
      });
    }
  });
};

export default {
  router,
  registerUser,
};
