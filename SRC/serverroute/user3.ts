import Express, { Request, Response, NextFunction } from "express";
import { userModel as Store } from "../serverModel/user3";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import { validatesignupSchema } from "../middleware/signup validator";
// import { validate } from "uuid";
const router = Express.Router();
router.use("/signup", Express.static("./upload/images"));
// router.use(errHandler);

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("/", (req, res, next) => {
  Store.find()
    .then((user) => {
      if (user.length > 0) {
        res.send(user);
      } else {
        res.send("No user to display");
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.get("/:id", (req, res, next) => {
  Store.findById(req.params.id).then((user) => {
    if (user) {
      const response = {
        status: "success",
        data: {
          Id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          othername: user.othername,
          email: user.email,
          Date_of_Birth: user.Date_of_Birth,
          state_of_origin: user.state_of_origin,
          phone_Number: user.phone_Number,
          image: `http://localhost:6000/image/${File}`,
        },
      };
      res.send(response);
    } else {
      res.send("No user found.");
    }
  });
});

router.get("/:email", (req, res, next) => {
  Store.findOne({ email: req.params.email }).then((user) => {
    if (user) {
      res.send(user);
    } else {
      res.send(" user with email not  found.");
    }
  });
});

router.post(
  "/signup",
  validatesignupSchema,
  upload.single("image"),
  (req, res, next) => {
    Store.init();
    Store.findOne({ email: req.body.email })
      .then((user) => {
        if (user != null) {
          res.send("email already exists");
        } else {
          const user = new Store({
            Id: new mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            othername: req.body.othername,
            email: req.body.email,
            password: req.body.password,
            Date_of_Birth: req.body.Date_of_Birth,
            state_of_origin: req.body.state_of_origin,
            phone_Number: req.body.phone_Number,
            image: {
              data: req.file?.filename,
              contentType: "image/jpeg",
            },
          });
          user
            .save()
            .then((user) => {
              const response = {
                status: "success",
                data: {
                  Id: user._id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  othername: user.othername,
                  email: user.email,
                  Date_of_Birth: user.Date_of_Birth,
                  state_of_origin: user.state_of_origin,
                  phone_Number: user.phone_Number,
                  profile_url: `http://localhost:6000/images/${req.file?.filename}`,
                  image: `http://localhost:6000/image/${req.file?.filename}`,
                },
              };
              res.send(response);
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
);

router.post("/login", (req, res, next) => {});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const { userModel } = req.body;
  Store.findByIdAndUpdate(
    { _id: id },
    // { phone_Number: phone_Number },
    // { lastname: lastname },
    { $set: { userModel } },
    { new: true }
  );
});

router.delete("/:id", (req, res, next) => {
  Store.findByIdAndRemove(req.params.id).then((user) => {
    if (!user) {
      res.send("No user found");
    } else {
      res.send("User deleted");
    }
  });
});

export default router;
