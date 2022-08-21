import { DataTypes } from "sequelize";
import sequelize from "../include/database.js";
import Flat from "./flat.js";
import User from "./user.js";

const Users_Flats = sequelize.define("users_flats", {}, { timestamps: false });

User.belongsToMany(Flat, { through: Users_Flats });
Flat.belongsToMany(User, { through: Users_Flats });

export default Flat;
