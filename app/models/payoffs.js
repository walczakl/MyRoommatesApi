import { DataTypes } from "sequelize";
import sequelize from "../include/database.js";
import Receipt from "./receipt.js";
import User from "./user.js";

const Payoff = sequelize.define("payoffs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  receipt_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
  },
  paying_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  owe_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  closed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

Payoff.belongsTo(Receipt, {
  foreignKey: "receipt_id",
});

Receipt.hasMany(Payoff, {
  foreignKey: "receipt_id",
});

// Payoff.sync({alter: false})

export default Payoff;
