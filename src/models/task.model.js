import mongoose from "mongoose";

import {TASK_PRIORITY,TASK_STATUS} from "../constants/task.constants.js";


const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: ""
    },
    scheduledAt: {
        type: Date,
        required: [true, "Schedule date is required"]
    },
    endAt:{
        type: Date,
        required: [true, "Task end time is required"],
        validate: {
            validator: function (value) {
            return value > this.scheduledAt;
            },
            message: "End time must be after start time",
  },
    },
    priority: {
        type: String,
        enum: Object.values(TASK_PRIORITY),
        default: TASK_PRIORITY.LOW
    },
    status:{
        type: String,
        enum: Object.values(TASK_STATUS),
        default: TASK_STATUS.PENDING
    }

},{
    timestamps: true
}
)
taskSchema.index({status: 1, schedueDate: 1});

const Task = mongoose.model("Task", taskSchema);

export default Task;