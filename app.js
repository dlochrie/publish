var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var errorHandler = require('./lib/error-handler');
var app = express();

// TODO: Path to views should be a constant.
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up sessions. The secret should be something secure.
// TODO: Move the configuration for the session secret.
app.use(session({
  secret: '4aac7a02-8ca0-4bda-b519-7bc1dd61f1da',
  resave: false,
  saveUninitialized: true
}));

// Add middleware for flashed messages.
app.use(function(req, res, next) {
  if (req.session && req.session.messages) {
    res.locals.flash = req.session.messages;

    // The messages object must be cleared on each page load, since it only
    // has a TTL of one view/page hit.
    req.session.messages = null;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Get a list of all the configuration files. The order is important.
var confList = ['globals', 'mongo', 'mysql', 'routes'];

// Load all the configuration files in the list.
confList.forEach(function(name) {
  var file = path.join(__dirname, 'config', name);
  var Config = require(file);
  return new Config(app);
});

// TODO: Formalize this.
// app.settings.publish['LOG QUERIES'] = true;

// Attach error handling middleware. This MUST come after router middleware,
// which is loaded in the configuration above.
app.use(errorHandler.pageNotFound);
app.use(errorHandler.pageError);


/**
 * Expose the Express app to application.
 * This is necessary for testing.
 */
module.exports = app;
