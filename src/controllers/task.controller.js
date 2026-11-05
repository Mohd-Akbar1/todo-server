
import {
    getTaskById,updateTask,
    updateTaskStatus,
    createTask,deleteTask,
    getAllTasks,getWeeklySummary
} from "../services/task.service.js";


// create task controller
export async function createTaskController(req, res, next) {
    try {
        const task = await createTask(req.validated.body);
        res.status(201).json({ 
            success: true,
            message: "Task created successfully",
            data: task 
            });
    }
    catch (error) {
        next(error);
    }
}

// get all tasks controller
export async function getAllTasksController(req, res, next) {
    try {
        const tasks = await getAllTasks();
        res.status(200).json({ 
            success: true,
            message: `Total ${tasks.length} tasks fetched successfully`,
            data: tasks 
            });
    }
    catch (error) {
        next(error);
    }
}

//get task by id controller
export async function getTaskByIdController(req, res, next) {
    try {
        const task = await getTaskById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: task
        });
    }
    catch (error) {
        next(error);
    }
}

// update task by id controller
export async function updateTaskController(req, res, next) {
    try {
        const task = await updateTask(req.params.id, req.validated.body);
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });
    }
    catch (error) {
        next(error);
    }

}


// delete task by id controller
export async function deleteTaskController(req, res, next) {
    try {
        const task = await deleteTask(req.params.id);
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: task
        });
    }
    catch (error) {
        next(error);
    }
}

// update task status by id controller
export async function updateTaskStatusController(req, res, next) {
    try {
        const task = await updateTaskStatus(req.params.id, req.validated.body.status);
        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: task
        });
    }
    catch (error) {
        next(error);
    }
}

// get weekly summary controller
export async function getWeeklySummaryController(req, res, next) {
    try {
        const summary = await getWeeklySummary(req.query);
        res.status(200).json({
            success: true,
            message: "Weekly summary fetched successfully",
            data: summary
        });
    }
    catch (error) {
        next(error);
    }
}   
