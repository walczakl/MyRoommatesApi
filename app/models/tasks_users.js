import { DataTypes } from "sequelize";
import sequelize from "../include/database.js";

const Tasks_Users = sequelize.define("tasks_users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

Tasks_Users.associate = (models) => {
  Tasks_Users.belongsTo(models.User, {
    foreignKey: "userId",
  });

  Tasks_Users.belongsTo(models.Task, {
    foreignKey: "taskId",
  });
};

export default Tasks_Users;
