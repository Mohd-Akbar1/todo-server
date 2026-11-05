
export default function errorHandlerMiddleware(err, req, res, next) {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    statusCode = 409;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    
  });
};

