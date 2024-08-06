//if no other middlware has handled the request and returns 404 
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); //calling next piece of middleware
};

//overriding default error handler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  /* SINCE checkObjectId.js based on Mongoose
  //Check for Mongoose bad ObjectId
  //ie if Mongoose not found error, set to 404 and change message to appropriate
  if(err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resource not found`;
    statusCode = 404;
  }
  */

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };