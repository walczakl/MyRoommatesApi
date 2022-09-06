import AppController from "./app_controller.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import Tasks_Users from "../models/tasks_users.js";
import e from "express";

class Tasks_UsersController extends AppController {
  constructor() {
    super();
  }
  addTaskUser(req, res, next) {
    //super.isAuth(req, res, next);
    const { taskId, userId } = req.body;
    if (taskId && userId) {
      Tasks_Users.create({
        taskId,
        userId,
      })
        .then((tasks_users) => res.json(tasks_users))
        .catch(next);
      res.status(201).json({ success: true });
    } else res.status(412).json({ success: false });
  }

  deleteTaskUser(req, res, next) {
    super.isAuth(req, res, next);
    const task_user = Tasks_Users.findOne({ where: { id: req.body.id } });
    if (task_user) {
      Tasks_Users.destroy({
        where: {
          id: req.body.id,
        },
      });
      res.status(201).json({ success: true });
    } else res.status(404).json({ success: false });
  }

  updateTaskUser(req, res, next) {
    //super.isAuth(req, res, next);
    const { taskId, userId } = req.body;
    const task_user = Tasks_Users.findOne({ where: { id: req.body.id } });
    if (task_user) {
      Task.update(
        {
          taskId,
          userId,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(201).json({ success: true });
    } else res.status(404).json({ success: false });
  }

  getTaskUserById(req, res, next) {
    //super.isAuth(req, res, next);
    const task_user = Tasks_Users.findOne({ where: { id: req.body.id } });
    if (task_user) {
      res.status(201);
      res.status(201).json({ success: true });
      return JSON.stringify(task_user);
    } else res.status(404).json({ success: false });
  }

  getAllTasksUsers(req, res, next) {
    //super.isAuth(req, res, next);
    const tasks_users = Tasks_Users.findAll()
      .then((res) => {
        console.log(res);
        res.status(201).json({ success: true });
        return JSON.stringify(tasks_users);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
        res.status(404).json({ success: false });
      });
  }
}

export default Tasks_UsersController;
