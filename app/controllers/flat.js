import AppController from "./app_controller.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import Flat from "../models/flat.js";
import e from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
class FlatController extends AppController {
  constructor() {
    super();
  }
  async createFlat(req, res, next) {
    // super.isAuth(req, res, next);
    const { name, password } = req.body;
    if (name && password) {
      bcrypt.hash(password, 12, (err, passwordHash) => {
        if (err) {
          return res.status(500).json({ message: "couldnt hash the password" });
        } else if (passwordHash) {
          return Flat.create({
            name: name,
            password: passwordHash,
          })
            .then((flat) => res.json(flat))
            .catch(next);
        }
      });
    } else if (name && !password)
      res.status(412).json({
        success: false,
        message: "You have to pass Your flat password!",
      });
    else
      res
        .status(412)
        .json({ success: false, message: "You have to pass Your flat name!" });
  }

  async deleteFlat(req, res, next) {
    //super.isAuth(req, res, next);
    const flat = await Flat.findOne({ where: { id: req.body.id } });
    if (flat) {
      Flat.destroy({
        where: {
          id: req.body.id,
        },
      });
      res
        .status(201)
        .json({ success: true, message: "Flat deleted successfully." });
    } else
      res.status(404).json({ success: false, message: "Flat not exists." });
  }

  async updateFlat(req, res, next) {
    //super.isAuth(req, res, next);
    const { name, password } = req.body;
    const flat = await Flat.findOne({ where: { id: req.body.id } });
    if (flat && !password) {
      Flat.update(
        {
          name,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res
        .status(201)
        .json({ success: true, message: "Flat updated successfully." });
    } else if (flat && password) {
      bcrypt.hash(password, 12, (err, passwordHash) => {
        if (err) {
          return res.status(500).json({ message: "couldnt hash the password" });
        } else if (passwordHash) {
          Flat.update(
            {
              name,
              password: passwordHash,
            },
            {
              where: {
                id: req.body.id,
              },
            }
          );
        }
      });
      res
        .status(201)
        .json({ success: true, message: "Flat updated successfully." });
    } else
      res.status(404).json({ success: false, message: "Flat not exists." });
  }

  async getFlatId(req, res, next) {
    //super.isAuth(req, res, next);
    const flat = await Flat.findOne({ where: { id: req.params.id } });
    if (flat) {
      res.json(flat);
    } else
      res.status(404).json({ success: false, message: "Flat not exists." });
  }

  async getAllFlats(req, res, next) {
    //super.isAuth(req, res, next);
    const flats = await Flat.findAll();
    if (flats) {
      res.json(flats);
    } else
      res.status(404).json({ success: false, message: "Flat not exists." });
  }

  async addUserToFlat(req, res, next) {
    console.log(req.params);
    const user = await User.findOne({ where: { id: req.params.userid } });
    const flat = await Flat.findOne({ where: { id: req.params.flatid } });
    if (user && flat) {
      user.flatId = flat.id;
      await user.save();
    } else {
      res
        .status(404)
        .json({ success: false, message: "Something went wrong." });
    }
  }
}
export default FlatController;
