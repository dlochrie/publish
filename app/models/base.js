var util = require('util'),
    Associations = require('../../lib/model-associations');


/**
 * Expose the Base Model.
 */
module.exports = Base;



/**
 * Constructor for the Base Model Class.
 * @param {express.app} app Express App instance.
 * @param {Object=} opt_resource Optional resource.
 * @constructor
 */
function Base(app, opt_resource) {
  /**
   * Reference to the "publish" app settings.
   * @type {!Object.<string>}
   * @private
   */
  this.settings_ = app.get('publish');

  /**
   * MySQL Database connection.
   * @type {!Object}
   * @private
   */
  this.dbc_ = this.settings_.mysql;

  /**
   * Optional model resource.
   * @type {?Object}
   * @private
   */
  this.resource_ = opt_resource || null;
}


/**
 * Finds all records that match the given parameters.
 * @param {function} cb Callback function to fire when done.
 */
Base.prototype.find = function(cb) {
  var associations = new Associations(this.tableName, this.modelAssociations),
      self = this;

  associations.getModelAssociations(function(joins) {
    var queryString;
    if (joins) {
      queryString = util.format(Base.SELECT_QUERY_STRING_WITH_JOIN_,
          self.tableName, joins);
    } else {
      queryString = util.format(Base.SELECT_QUERY_STRING_WITHOUT_JOIN_,
          self.tableName);
    }

    var columns = self.getColumns();
    var where = self.getQueryObject() || Base.DEFAULT_WHERE_VALUE_;
    self.select(queryString, columns, where, cb);
  });
};


/**
 * Finds exactly one record that matches the given parameters.
 * @param {function} cb Callback function to fire when done.
 */
Base.prototype.findOne = function(cb) {
  var associations = new Associations(this.tableName, this.modelAssociations),
      self = this;

  associations.getModelAssociations(function(joins) {
    var queryString;
    if (joins) {
      queryString = util.format(Base.SELECT_ONE_QUERY_STRING_WITH_JOIN_,
          self.tableName, joins);
    } else {
      queryString = util.format(Base.SELECT_ONE_QUERY_STRING_WITHOUT_JOIN_,
          self.tableName);
    }

    var columns = self.getColumns();
    var where = self.getQueryObject() || Base.DEFAULT_WHERE_VALUE_;
    self.select(queryString, columns, where, function(err, results) {
      var result = results && results.length ? results.shift() : {};
      cb(err, result);
    });
  });
};


/**
 * Wrapper for SELECT statements.
 * Performs query and returns connection back to pool.
 * @param {string} query The query string to append values to.
 * @param {!Object} columns The columns to retrieve in the query.
 * @param {!Object} where The parameters that identify the result set.
 * @param {function(string, Array)} cb Callback function to perform when
 *     done.
 */
Base.prototype.select = function(query, columns, where, cb) {
  var self = this;
  this.dbc_.getConnection(function(err, connection) {
    if (err) return cb(err, null);
    var options = {sql: query, nestTables: true};
    var q = connection.query(options, [columns, where], function(err, results) {
      connection.release();
      cb(err, results);
    });
    self.logQuery_(q);
  });
};


/**
 * Retrieves the SELECT columns for the model.
 * @return {!Array.<string>} List of columns for SELECT statements.
 */
Base.prototype.getColumns = function() {
  return this.tableColumns || [];
};


/**
 * Converts the model resource into a query object with key:value pairs.
 * @return {?Object} The formatted resource.
 */
Base.prototype.getQueryObject = function() {
  var resource = this.resource_ && Base.isObject_(this.resource_) ?
      this.resource_ : null,
      queryObject;

  if (resource) {
    var structure = this.structure,
        tableName = this.tableName,
        fields = Object.keys(structure) || [],
        queryObject = {};

    fields.forEach(function(field) {
      if (resource[field]) {
        queryObject[tableName + '.' + field] = resource[field];
      }
    });
  }
  return queryObject;
};


/**
 * Logs the assembled and escaped query after it has run.
 * Application must set `LOG QUERIES` for the logs to be displayed.
 * @param {Object} query Node-Mysql query result.
 * @private
 */
Base.prototype.logQuery_ = function(query) {
  if (this.settings_['LOG QUERIES']) {
    query = query || {};
    var message = util.format('MySQL Query:\t %s', query.sql || 'N/A');
    console.log(message);
  }
};


/**
 * Determines whether an item is an Object (but not an Array).
 * See: http://stackoverflow.com/a/14706877/1058612.
 * @param {*} object Item to test for object-ness.
 * @return {boolean} Whether the value is an object or not.
 * @private
 */
Base.isObject_ = function(object) {
  return object === Object(object) &&
      Object.prototype.toString.call(object) !== '[object Array]';
};


/**
 * Default 'where' value for SELECT statements.
 * @const {string}
 * @private
 */
Base.DEFAULT_WHERE_VALUE_ = 1;


/**
 * Query string template for SELECT's that return multiple records.
 * Placeholders (%s) should be the table name, and any JOINs, where applicable.
 * @const {string}
 * @private
 */
Base.SELECT_QUERY_STRING_WITH_JOIN_ = 'SELECT ?? FROM `%s` %s WHERE ?';


/**
 * Query string template for SELECT's that return multiple records.
 * Placeholder (%s) should be the table name.
 * @const {string}
 * @private
 */
Base.SELECT_QUERY_STRING_WITHOUT_JOIN_ = 'SELECT ?? FROM `%s` WHERE ?';


/**
 * Query string template for SELECT's that return exactly one record.
 * Placeholders (%s) should be the table name, and any JOINs, where applicable.
 * @const {string}
 * @private
 */
Base.SELECT_ONE_QUERY_STRING_WITH_JOIN_ =
    'SELECT ?? FROM `%s` %s WHERE ? LIMIT 1';


/**
 * Query string template for SELECT's that return exactly one record.
 * Placeholders (%s) should be the table name
 * @const {string}
 * @private
 */
Base.SELECT_ONE_QUERY_STRING_WITHOUT_JOIN_ =
    'SELECT ?? FROM `%s` WHERE ? LIMIT 1';


/**
 * Query string template for INSERT's.
 * @const {string}
 * @private
 */
Base.INSERT_QUERY_STRING_ = 'INSERT INTO `%s` SET ?';


/**
 * Query string template for UPDATE's.
 * @const {string}
 * @private
 */
Base.UPDATE_QUERY_STRING_ = 'UPDATE `%s` SET ? WHERE ?';


/**
 * Query string template for DELETE's. Limits deletes to 1 record at a time.
 * @const {string}
 * @private
 */
Base.DELETE_QUERY_STRING_ = 'DELETE FROM `%s` WHERE ? LIMIT 1';
