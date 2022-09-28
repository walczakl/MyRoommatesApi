import AppController from "./app_controller.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import Task from "../models/task.js";
import e from "express";

class TaskController extends AppController {
  constructor() {
    super();
  }
  async addTask(req, res, next) {
    //super.isAuth(req, res, next);
    const {
      title,
      content,
      isEndTime,
      endTime,
      finished,
      finishedAt,
      creatorId,
      performerId,
      importanceId,
      homeId,
    } = req.body;
    if (title) {
      await Task.create({
        title,
        content,
        isEndTime,
        endTime,
        finished,
        finishedAt,
        creatorId,
        performerId,
        importanceId,
        homeId,
      })
        .then((task) => res.json(task))
        .catch(next);
    } else
      res
        .status(412)
        .json({ success: false, message: "You have to pass title!" });
  }

  async deleteTask(req, res, next) {
    // super.isAuth(req, res, next);
    const task = await Task.findOne({ where: { id: req.body.id } });
    if (task) {
      await Task.destroy({
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

  async updateTask(req, res, next) {
    //super.isAuth(req, res, next);
    const {
      title,
      content,
      isEndTime,
      endTime,
      finished,
      finishedAt,
      creatorId,
      performerId,
      importanceId,
      homeId,
    } = req.body;

    const task = await Task.findOne({ where: { id: req.body.id } });
    if (task) {
      await Task.update(
        {
          title,
          content,
          isEndTime,
          endTime,
          finished,
          finishedAt,
          creatorId,
          performerId,
          importanceId,
          homeId,
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

  async getTaskId(req, res, next) {
    //super.isAuth(req, res, next);
    const task = await Task.findOne({ where: { id: req.params.id } });
    if (task) {
      res.json(task);
    } else
      res.status(404).json({ success: false, message: "Task not exists." });
  }

  async getTaskByCreatorId(req, res, next) {
    //super.isAuth(req, res, next);
    const task = await Task.findAll({ where: { creatorId: req.params.id } });
    if (task) {
      res.json(task);
    } else
      res.status(404).json({ success: false, message: "Task not exists." });
  }

  async getTaskByPerformerId(req, res, next) {
    //super.isAuth(req, res, next);
    const task = await Task.findAll({ where: { performerId: req.params.id } });
    if (task) {
      res.json(task);
    } else
      res.status(404).json({ success: false, message: "Task not exists." });
  }

  async getAllTasks(req, res, next) {
    //super.isAuth(req, res, next);
    const tasks = await Task.findAll();
    if (tasks) {
      res.json(tasks);
    } else {
      res.status(404).json({ success: false, message: "Tasks not exists." });
    }
  }
}

export default TaskController;
