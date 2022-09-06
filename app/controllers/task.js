import AppController from "./app_controller.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import Task from "../models/task.js";
import e from "express";

class TaskController extends AppController {
  constructor() {
    super();
  }
  addTask(req, res, next) {
    //super.isAuth(req, res, next);
    const {
      title,
      content,
      isEndTime,
      endTime,
      finished,
      finishedAt,
      createdBy,
      forWho,
      imgPath,
    } = req.body;
    if (title) {
      Task.create({
        title,
        content,
        isEndTime,
        endTime,
        finished,
        finishedAt,
        createdBy,
        forWho,
        imgPath,
      })
        .then((task) => res.json(task))
        .catch(next);
      res
        .status(201)
        .json({ success: true, message: "Task added successfully." });
    } else
      res
        .status(412)
        .json({ success: false, message: "You have to pass title!" });
  }

  deleteTask(req, res, next) {
    super.isAuth(req, res, next);
    const task = Task.findOne({ where: { id: req.body.id } });
    if (task) {
      Task.destroy({
        where: {
          id: req.body.id,
        },
      });
      res
        .status(201)
        .json({ success: true, message: "Task deleted successfully." });
    } else
      res.status(404).json({ success: false, message: "Task not exists." });
  }

  updateTask(req, res, next) {
    //super.isAuth(req, res, next);
    const {
      title,
      content,
      isEndTime,
      endTime,
      finished,
      finishedAt,
      createdBy,
      forWho,
      imgPath,
    } = req.body;

    const task = Task.findOne({ where: { id: req.body.id } });
    if (task) {
      Task.update(
        {
          title,
          content,
          isEndTime,
          endTime,
          finished,
          finishedAt,
          createdBy,
          forWho,
          imgPath,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res
        .status(201)
        .json({ success: true, message: "Task updated successfully." });
    } else
      res.status(404).json({ success: false, message: "Task not exists." });
  }

  getTaskId(req, res, next) {
    //super.isAuth(req, res, next);
    const task = Task.findOne({ where: { id: req.body.id } });
    if (task) {
      res.status(201);
      res.status(201).json({ success: true, message: JSON.stringify(task) });
      return JSON.stringify(task);
    } else
      res.status(404).json({ success: false, message: "Task not exists." });
  }

  getAllTasks(req, res, next) {
    //super.isAuth(req, res, next);
    const tasks = Task.findAll()
      .then((res) => {
        console.log(res);
        res.status(201).json({ success: true, message: JSON.stringify(tasks) });
        return JSON.stringify(tasks);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
        res.status(404).json({ success: false, message: "Tasks not exists." });
      });
  }
}

export default TaskController;
