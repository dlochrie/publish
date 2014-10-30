var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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
app.use(express.static(path.join(__dirname, 'public')));

// Configure the Mongo DB Connection.
require('./config/mongo')(app);

// Configure the Routes for the application.
// This should be placed above any error-handling logic.
require('./config/routes')(app);

// Attach error handling middleware. This MUST come after router middleware.
app.use(errorHandler.pageNotFound);
app.use(errorHandler.pageError);

/**
 * Expose the Express app to application.
 * This is necessary for testing.
 */
module.exports = app;
