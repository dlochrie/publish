/**
 * Configuration for the MySQL client connection.
 */
var MySQLClient = require('mysql'),
    util = require('util');



/**
 * Configures the MySQLDB connection.
 * @param {!express} app The express application instance.
 * @constructor
 */
function MySQL(app) {
  /**
   * Reference to the "publish" app settings.
   * @private {!Object.<string>}
   */
  this.settings_ = app.get('publish');

  /**
   * Name of the the MySQL DB for this application.
   * @private {string}
   */
  this.dbName_ = this.settings_['MYSQL DB'];

  /**
   * Host address for the the MySQL DB.
   * @private {string}
   */
  this.dbHost_ = this.settings_['MYSQL HOST'];

  /**
   * User Name for the MySQL.
   * @private {string}
   */
  this.dbUser_ = this.settings_['MYSQL USER'];

  /**
   * User Password for MySQL.
   * @private {string}
   */
  this.dbPass_ = this.settings_['MYSQL PASS'];

  /**
   * Maximum connections to make available in MySQL pool. Defaults to 10.
   * @private {string}
   */
  this.dbMaxConns_ = this.settings_['MYSQL_MAX_CONN'] || 10,

  // Connect to the database.
  this.connect_();
}


/**
 * Attempts to connect to the MySQL database, and throws an error if
 * unseccessful.
 * @private
 */
MySQL.prototype.connect_ = function() {
  var settings = this.settings_;

  var connection = MySQLClient.createPool({
    database: this.dbName_,
    host: this.dbHost_,
    user: this.dbUser_,
    password: this.dbPass_,
    connectionLimit: this.dbMaxConns_,
    nestTables: true
  });

  if (connection) {
    this.settings_['MYSQL CONNECTION'] = connection;
  } else {
    var err = util.format(
        'Could not connect to MySQL DB using connection string "%s"',
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
MySQL.prototype.handleError_ = function(err) {
  throw new Error(err);
};


/**
 * Expose the MySQL Module.
 */
module.exports = MySQL;
