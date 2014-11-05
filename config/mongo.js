/**
 * Configuration for the MongoDB client connection.
 * Since the MongoDB connection handles it's own pooling, we only need one
 * connection for the application.
 */
var MongoClient = require('mongodb').MongoClient,
    util = require('util');



/**
 * Configures the MongoDB connection.
 * @param {!express} app The express application instance.
 * @constructor
 */
function Mongo(app) {
  /**
   * Reference to the "publish" app settings.
   * @private {!Object.<string>}
   */
  this.settings_ = app.get('publish');

  /**
   * Connection string for the Mongo.
   * @private {string}
   */
  this.connectionString_ = app.settings.publish['MONGO CONNECTION STRING'];

  // Connect to the database.
  this.connect_();
}


/**
 * Attempts to connect to the Mongo database, and throws an error if
 * unseccessful.
 * @private
 */
Mongo.prototype.connect_ = function() {
  var connectionString = this.connectionString_,
      settings = this.settings_,
      self = this;

  if (connectionString) {
    MongoClient.connect(connectionString, function(err, dbc) {
      if (err) {
        self.handleError_(err);
      } else {
        // Store the Mongo DBC on the "publish" namespace.
        settings['mongo'] = dbc;
      }
    });
  } else {
    var err = util.format(
        'Could not connect to Mongo DB using connection string "%s"',
        this.connectionString);
    this.handleError_(err);
  }
};


/**
 * Throws a new error with the error message. Since the application cannot
 * function without a functional database, the entire process is shutdown.
 * @param {string} err The error message to display.
 * @private
 */
Mongo.prototype.handleError_ = function(err) {
  throw new Error(err);
};


/**
 * Expose the Mongo Module.
 */
module.exports = Mongo;
