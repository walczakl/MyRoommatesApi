import sequelize from "../include/database.js";
import Receipt from "./receipt.js";
import Image from "./image.js";
import { DataTypes } from "sequelize";

const Receipts_Images = sequelize.define(
  "receipts_images",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    receiptId: {
      type: DataTypes.INTEGER,
      references: {
        model: Receipt,
        key: "id",
      },
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: {
        model: Image,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

Receipt.belongsToMany(Image, {
  through: "receipts_images",
  as: "images",
  foreignKey: "receiptId",
});
Image.belongsToMany(Receipt, {
  through: "receipts_images",
  as: "receipts",
  foreignKey: "imageId",
});

export default Receipts_Images;
