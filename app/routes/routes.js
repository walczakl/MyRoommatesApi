import express from "express";
import { login, signup } from "../controllers/auth.js";
import FlatController from "../controllers/flat.js";
import TaskController from "../controllers/task.js";
import Tasks_UsersController from "../controllers/tasks_users.js";
const router = express.Router();

router.post("/login", login);

router.post("/register", signup);

// Flat
const flatController = new FlatController();
router.post("/create_flat", flatController.createFlat);
router.post("/update_flat", flatController.updateFlat);
router.post("/delete_flat", flatController.deleteFlat);

router.get("/get_flat/:id", flatController.getFlatId);
router.get("/get_flats", flatController.getAllFlats);

// Task
const taskController = new TaskController();
router.post("/add_task", taskController.addTask);
router.post("/update_task", taskController.updateTask);
router.post("/delete_task", taskController.deleteTask);

router.get("/get_task_id/:id", taskController.getTaskId);
router.get("/get_tasks", taskController.getAllTasks);

// Tasks_Users
const tasks_UsersController = new Tasks_UsersController();
router.post("/add_task_user", tasks_UsersController.addTaskUser);
router.post("/update_task_user", tasks_UsersController.updateTaskUser);
router.post("/delete_task_user", tasks_UsersController.deleteTaskUser);

router.get("/get_task_user_id/:id", tasks_UsersController.getTaskUserById);
router.get("/get_tasks_user", tasks_UsersController.getAllTasksUsers);

export default router;
