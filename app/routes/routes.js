import express from "express";
import UserController from "../controllers/user.js";
import TaskController from "../controllers/task.js";
import Tasks_UsersController from "../controllers/tasks_users.js";
import { login, register, getUser } from "../controllers/auth.js";
import FlatController from "../controllers/flat.js";
import ReceiptController from "../controllers/receipt.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

// User
const userController = new UserController();
router.get("/get_user_id/:id", userController.getUserById);
router.get("/get_user/:username", userController.getUserByUsername);
router.get("/get_users_flat/:id", userController.getUsersByFlatId);

// Flat
const flatController = new FlatController();
router.post("/create_flat", flatController.createFlat);
router.post("/update_flat", flatController.updateFlat);
router.post("/delete_flat", flatController.deleteFlat);

router.get("/get_flat/:id", flatController.getFlatId);
router.get("/get_flats", flatController.getAllFlats);
router.post("/add_user_to_flat/:userid/:flatid", flatController.addUserToFlat);
router.get("/getFlatUsers/:flatId", flatController.getFlatUsers);


// Task
const taskController = new TaskController();
router.post("/add_task", taskController.addTask);
router.post("/update_task", taskController.updateTask);
router.post("/delete_task", taskController.deleteTask);

router.get("/get_task/:id", taskController.getTaskId);
router.get("/get_task_creator/:id", taskController.getTaskByCreatorId);
router.get("/get_task_performer/:id", taskController.getTaskByPerformerId);
router.get("/get_tasks", taskController.getAllTasks);

// Tasks_Users
const tasks_UsersController = new Tasks_UsersController();
router.post("/add_task_user", tasks_UsersController.addTaskUser);
router.post("/update_task_user", tasks_UsersController.updateTaskUser);
router.post("/delete_task_user", tasks_UsersController.deleteTaskUser);

router.get("/get_task_user_id/:id", tasks_UsersController.getTaskUserById);
router.get("/get_tasks_user", tasks_UsersController.getAllTasksUsers);

//Receipt
const receipt_controller = new ReceiptController()
router.post('/create_receipt', receipt_controller.createReceipt)
router.get('/get_summary/:flat_id/:user_id', receipt_controller.getSummary)
router.get('/getReciepts/:flatId', receipt_controller.getReciepts)
router.post('/accept_summary', receipt_controller.accept)


export default router;
