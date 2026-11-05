import mongoose from "mongoose";
import Task from "../models/task.model.js";
import { TASK_PRIORITY, TASK_STATUS } from "../constants/task.constants.js";



// create tasks
export async function createTask(taskData) {
    const task = new Task(taskData);
    await task.save();
    return task;
}


//  get all taks  
export async function getAllTasks() {
   

    const tasks = await Task.find()
        .sort({ createdAt: -1 })
        

    return tasks;


}



// get task by id
export async function getTaskById(taskId) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        const error = new Error("Invalid task ID");
       
        error.statusCode = 404;
        throw error;
        
    }

    const task = await Task.findById(taskId);

    if (!task) {
         const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;

}

//update task by id
export async function updateTask(taskId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        const error = new Error("Invalid task ID");
        error.statusCode = 404;
        throw error;
    }

    const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;

}

// delete task by id
export async function deleteTask(taskId) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
       const error = new Error("Invalid task ID");
        error.statusCode = 404;
        throw error;
    }

    const task = await Task.findByIdAndDelete(taskId);  

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;

}


// update task status by id
export async function updateTaskStatus(taskId, status) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
       const error = new Error("Invalid task ID");
        error.statusCode = 404;
        throw error;
    }

    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
}

// search tasks by title or description
export async function searchTasks(searchQuery) {
    const escapedKeyword = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return await Task.find({
    $or: [
      { title: { $regex: escapedKeyword, $options: "i" } },
      { description: { $regex: escapedKeyword, $options: "i" } },
    ],
  }).sort({ scheduledAt: 1 });
}


//get weekly summary of tasks
export async function getWeeklySummary() {
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() - now.getDay() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  console.log("Start of Week:", startOfWeek);
  console.log("End of Week:", endOfWeek);

  const summary = await Task.aggregate([
    {
      $match: {
        scheduledAt: { $gte: startOfWeek, $lte: endOfWeek }, // 👈 fixed
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  console.log("Weekly Summary:", summary);

  return summary;
}



