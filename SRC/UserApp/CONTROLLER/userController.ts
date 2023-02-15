import Express, { Request, Response, NextFunction } from "express";
import { userModel as User } from "../MODEL/userModel";
import bcrypt from "bcrypt";
import multer, { diskStorage } from "multer";
import path from "path";

export class Usercontroller {
  static async getAlluser(req: Request, res: Response) {
    try {
      const user = User.find().select(
        "firstname lastname othername email password date_of_birth state_of_origin"
      );
      const result = await user;
      if (result) {
        return res.send(result);
      }
      return res.status(404).send("No user found");
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getUserById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("user not found");
      }
      return res.send(user);
    } catch (err) {
      console.log(err);
    }
  }
  static async getUserByEmail(req: Request, res: Response) {
    const email = req.params.email;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).send("no user found");
      }
      return res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async registerUser(req: Request, res: Response) {
    const storage = diskStorage({
      destination: "./uploads/images",
      filename: (req, file, cb) => {
        cb(
          null,
          `${file.fieldname}${new Date()}${path.extname(file.originalname)}`
        );
      },
    });

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    });

    const {
      firstname,
      lastname,
      othername,
      email,
      password,
      state_of_origin,
      date_of_birth,
      phone,
    } = req.body;
    try {
      const file = req.file?.filename;
      const existuser = await User.findOne({ email: email, phone: phone });
      if (existuser) {
        return res.status(409).send("email / phone already exist");
      }
      upload.single("images");
      const hash = bcrypt.hashSync(password, 10);
      const user = new User({
        firstname,
        lastname,
        othername,
        email,
        password: hash,
        state_of_origin,
        date_of_birth,
        phone,
        image: {
          data: req.file?.filename,
          contentType: "image/jpeg",
          url: `http://localhost:7070/upload/image/${file}`,
        },
        created: new Date(),
      });
      await user.save();
      return res.status(201).send({ message: "user created", users: user });
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).send("no user found");
      }
      const ismatch = bcrypt.compareSync(password, user.password);
      if (!ismatch) {
        return res.status(401).send("wrong Auth");
      }
      return res.send("login successful");
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteUserById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).send("user not found");
      }
      return res.send(`${user.firstname} has been deleted`);
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteUserByEmail(req: Request, res: Response) {
    const email = req.params.email;
    try {
      const user = await User.findOneAndRemove({ email: email });
      if (!user) {
        return res.status(404).send("user not found");
      }
      return res.send(`${user.email} has been deleted`);
    } catch (err) {
      console.log(err);
    }
  }
  static async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const { firstname, lastname } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { firstname, lastname } },
        { new: true }
      );
      return res.send({ user: user, updatedAt: new Date() });
    } catch (err) {
      console.log(err);
    }
  }
}
