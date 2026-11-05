import express from "express";
import cors from "cors";
import todoRoutes from "./routes/task.routes.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorHandlerMiddleware from "./middleware/error.middleware.js";

const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check api
app.get("/api/health", (req, res) => {
  res.status(200).json({status:true, message: "Server is running"});
});


// application routes
app.use("/api/tasks", todoRoutes);

// handle undefined routes
app.use(notFoundMiddleware);

//global error handling middleware
app.use(errorHandlerMiddleware);


export default app;
