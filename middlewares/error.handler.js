function logErros(err, req, res, next) {
  console.log('Log erros');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('Error handler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErros, errorHandler}
