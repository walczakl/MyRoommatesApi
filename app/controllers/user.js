import AppController from "./app_controller.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/user.js";

class UserController extends AppController {
  constructor() {
    super();
  }
  getUserById = async (req, res) => {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    }).catch((err) => {
      console.log("error", err);
    });
    if (user) {
      return res.status(209).json({ user: user });
    } else {
      return res.status(409).json({ message: "User not found" });
    }
  };

  getUserByUsername = async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    }).catch((err) => {
      console.log("error", err);
    });
    if (user) {
      return res.status(209).json({ user: user });
    } else {
      return res.status(409).json({ message: "User not found" });
    }
  };

  async getUsersByFlatId(req, res) {
    const user = await User.findAll({
      where: {
        flatId: req.params.id,
      },
    }).catch((err) => {
      console.log("error", err);
    });
    if (user) {
      return res.status(209).json({ user: user });
    } else {
      return res.status(409).json({ message: "User not found" });
    }
  }
}
export default UserController;
