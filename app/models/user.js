import { DataTypes } from "sequelize";
import sequelize from "../include/database.js";
import Flat from "./flat.js";
import Payoff from "./payoffs.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  flatId: {
    type: DataTypes.INTEGER,
  },
});

User.hasMany(Payoff, {
  foreignKey: "paying_user_id",
  as: "payUser",
});

User.hasMany(Payoff, {
  foreignKey: "owe_user_id",
  as: "OweUser",
});

Payoff.belongsTo(User, {
  foreignKey: "paying_user_id",
  as: "payUser",
});

Payoff.belongsTo(User, {
  foreignKey: "owe_user_id",
  as: "oweUser",
});

User.belongsTo(Flat, {
  foreignKey: "flatId",
});

// User.sync({alter: false})

export default User;
