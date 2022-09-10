import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/user.js";

const login = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((err) => {
    console.log("error", err);
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  } else {
    bcrypt.compare(req.body.password, user.password, (err, compareRes) => {
      if (err) {
        // error while comparing
        res.status(502).json({ message: "Error while checking user password" });
      } else if (compareRes) {
        // password match
        const token = jwt.sign({ username: req.body.username }, "secret", {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: "User logged in",
          token: token,
          expiresIn: moment().add(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
        });
      } else {
        // password doesnt match
        res.status(401).json({ message: "Invalid username or password" });
      }
    });
  }
};

const signup = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((err) => {
    console.log("error", err);
  });
  if (user) {
    return res
      .status(409)
      .json({ message: "User with username already exists" });
  } else if (req.body.username && req.body.password) {
    // password hash
    bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
      if (err) {
        return res.status(500).json({ message: "couldnt hash the password" });
      } else if (passwordHash) {
        return User.create({
          username: req.body.username,
          email: req.body.email,
          password: passwordHash,
        })
          .then(() => {
            res.status(201).json({ message: "User created" });
          })
          .catch((err) => {
            console.log(err);
            res.status(502).json({ message: "error while creating the user" });
          });
      }
    });
  } else if (!req.body.password) {
    return res.status(400).json({ message: "password not provided" });
  } else if (!req.body.username) {
    return res.status(400).json({ message: "username not provided" });
  }
};

export { login, signup };
