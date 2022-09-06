import { DataTypes } from "sequelize";
import sequelize from "../include/database.js";

const Task = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  isEndTime: {
    type: DataTypes.BOOLEAN,
  },
  endTime: {
    type: DataTypes.DATE,
  },
  finished: {
    type: DataTypes.BOOLEAN,
  },
  finishedAt: {
    type: DataTypes.DATE,
  },
  creatorId: {
    type: DataTypes.INTEGER,
  },
  performerId: {
    type: DataTypes.INTEGER,
  },
  imgPath: {
    type: DataTypes.STRING,
  },
});

export default Task;
