const ErrorResponse = require('../utils/errResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //log to console for dev
  console.log(err);

  //Mongoose bad objectID
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Duplicate id error
  if (err.code === 11000) {
    const message = 'Duplicate content found. Please try something new';
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
