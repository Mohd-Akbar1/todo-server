
import express from "express";
import { 
    createTaskController,
    getAllTasksController,
    getTaskByIdController, 
    updateTaskController,
    updateTaskStatusController, 
    deleteTaskController,
    getWeeklySummaryController  
       } 
       from "../controllers/task.controller.js";
import ValidationMiddleware from "../middleware/validation.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validator/task.validator.js";

const router = express.Router();

router.get("/", getAllTasksController);// get all tasks
router.get("/summary/weekly", getWeeklySummaryController);  // get weekly summary of tasks

router.get("/:id", getTaskByIdController);// get task by id

router.post("/",ValidationMiddleware(createTaskSchema), createTaskController); // create new task

router.put("/:id", ValidationMiddleware(updateTaskSchema), updateTaskController); // update task by id

router.put("/status/:id", ValidationMiddleware(updateTaskSchema), updateTaskStatusController); // update task status by id

router.delete("/:id", deleteTaskController); // delete task by id

export default router;
