import {z} from "zod";
import  {TASK_PRIORITY, TASK_STATUS}  from "../constants/task.constants.js";

//create task validation schema

export const createTaskSchema = z.object({
    title: z.string()
    .trim()
    .min(2, {message: "Title must be at least 2 characters long"})
    .max(200, {message: "Title must be at most 200 characters long"}),

    description: z.string()
    .trim()
    .max(1000, {message: "Description must be at most 1000 characters long"})
    .optional(),

    scheduledAt: z.coerce.date({
                            error: "A valid schedule date is required"
                            }),
    endAt: z.coerce.date({
        error: "A valid end date is required"
    }),

    priority: z.enum([TASK_PRIORITY.LOW, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.HIGH]).optional(),

    status: z.enum([TASK_STATUS.PENDING, TASK_STATUS.IN_PROGRESS, TASK_STATUS.COMPLETED]).optional()
})

// update task validation schema
export const updateTaskSchema = createTaskSchema.partial()
.refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
});


