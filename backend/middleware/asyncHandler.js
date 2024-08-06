const asyncHandler = fn => (req, res, next) => {
  //after resolving calls the next piece of middleware
  Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;