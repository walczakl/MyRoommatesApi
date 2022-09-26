import { DataTypes } from "sequelize";
import sequelize from "../include/database.js";
import Flat from "./flat.js";
import Payoff from "./payoffs.js";

const Receipt = sequelize.define("receipts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  flat_id: {
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

Receipt.belongsTo(Flat, {
  foreignKey: "flat_id",
});

Flat.hasMany(Receipt, {
  foreignKey: "flat_id",
});

// Receipt.sync({alter: true})

export default Receipt;
