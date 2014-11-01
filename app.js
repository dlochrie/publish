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

// Load all the settings.
var globals = path.join(__dirname, 'config', 'globals.json');
var properties = require(globals).properties;
var env = process.env.NODE_ENV.toUpperCase();
var settings = {};
for (var prop in properties) {
  var setting = properties[prop];
  var environmental = [env, setting.systemName].join('');
  settings[setting.name] = process.env[environmental] || setting.default;
}
app.set('publish', settings);

// Get a list of all the configuration files. The order is important.
var confList = ['mongo', 'routes'];

// Load all the configuration files in the list.
confList.forEach(function(name) {
  var file = path.join(__dirname, 'config', name);
  var Config = require(file);
  return new Config(app);
});

// Attach error handling middleware. This MUST come after router middleware,
// which is loaded in the configuration above.
app.use(errorHandler.pageNotFound);
app.use(errorHandler.pageError);


/**
 * Expose the Express app to application.
 * This is necessary for testing.
 */
module.exports = app;
