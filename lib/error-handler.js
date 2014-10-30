/**
 * Provides error-handling methods for the application.
 */


/**
 * Catches 404 (Not Found) errors and forwards them to error handler.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 * @param {function(Object)} next Callback function to call when done.
 */
exports.pageNotFound = function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};


/**
 * Handles application errors. Prints an optional stacktrace when the
 * environment is not Prod.
 * @param {!Error} err The error object containing the status and message.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 * @param {function(Object)} next Callback function to call when done.
 */
exports.pageError = function(err, req, res, next) {
  // Only print a stacktrace if this is not the production version.
  var app = req.app;

  // TODO: Shouldn't the environment come from elsewhere...?
  err = app.get('env') !== 'prod' ? err : {};
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
};
