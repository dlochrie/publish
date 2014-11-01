/**
 * Configures the application globals. These values come from environmental
 * variables, and are set on the Express app instance as a setting under the
 * "publish" namespace. The mapping for the environmental variables can be found
 * in the "globals.json" file.
 */
var path = require('path'),
    util = require('util');



/**
 * Constructor for the Globals module.
 * @param {!express} app The express application instance.
 * @constructor
 */
function Globals(app) {
  var globals = path.join(__dirname, 'globals.json'),
      properties = require(globals).properties,
      env = process.env.NODE_ENV.toUpperCase(),
      settings = {};

  // Extract the values for each of the application settings.
  for (var prop in properties) {
    var setting = properties[prop];
    var environmental = [env, setting.systemName].join('');
    var key = setting.name,
        value = process.env[environmental] || setting.default;

    // Abort if any of the environmental variables are missing.
    if (key && value) {
      settings[setting.name] = process.env[environmental] || setting.default;
    } else {
      throw new Error(util.format(
          'Could not load the "%s" environmental variable. Please make sure ' +
          'that it is set.', environmental));
    }
  }

  // Attach the settings in the "publish" namespace.
  app.set('publish', settings);
}


/**
 * Expose the Globals Module.
 */
module.exports = Globals;
