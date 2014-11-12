/**
 * Provides a library/framework for building model associations. For each
 * different kind of association ("Belongs To", Has Many",
 * "Has and belongs to Many", etc), there is a supporting method that will
 * create the SQL snippet needed to join the models.
 *
 * In order to avoid synchronous/blocking behavior, we use a parallel-async flow
 * control pattern that is described here:
 * http://book.mixu.net/node/ch7.html (7.2.2 Control flow pattern #2).
 */
var util = require('util');



/**
 * Constructor for the model-associations module.
 * @param {string} baseTable Name of the main/base table to find associations.
 * @param {enum} associations Object containing the mapping of the model
 *     associations.
 * @constructor
 */
function ModelAssociations(baseTable, associations) {
  /**
   * Name of the base table to get associations for.
   * @type {string}
   * @private
   */
  this.baseTable_ = baseTable;

  /**
   * Mapping of associated models, and their relationship to the baseTable.
   * @enum {!Object.<string, Object>}
   * @private
   */
  this.associations_ = associations;

  /**
   * List of tables to join onto the base table.
   * @type {!Array.<string>}
   * @private
   */
  this.assocList_ = Object.keys(this.associations_);

  /**
   * Array of SQL Join Snippets.
   * @type {!Array.<string>}
   * @private
   */
  this.joinStrings_ = [];
}


/**
 * Builds a SQL Join snippet when the associated model belongs to the main
 * model. For example, a Post belongs to a User.
 * @param {!Object} assoc Object containing the model's associations' mapping.
 * @return {string} The SQL snippet for the JOIN.
 */
ModelAssociations.prototype.getBelongsToJoin = function(assoc, cb) {
  var baseTable = this.baseTable_,
      joinTable = assoc.tableName,
      joinColumn = assoc.foreignKey;

  cb(util.format('LEFT JOIN `%s` ON `%s`.`%s` = `%s`.`id`',
      joinTable, baseTable, joinColumn, joinTable));
};


/**
 * Builds a SQL JOIN snippet when the main model has and belongs to many of
 * the entities in the associated model. For example, Posts have and belong to
 * many Categories, and vice-versa. This relationship requires a join table.
 * @param {!Object} assoc Object containing the model's associations' mapping.
 * @return {string} The SQL snippet for the JOIN.
 */
ModelAssociations.prototype.getHABTMJoin = function(assoc, cb) {
  cb(null);
};


/**
 * ??? When does this ever happen?
 * @param {!Object} assoc Object containing the model's associations' mapping.
 * @return {string} The SQL snippet for the JOIN.
 */
ModelAssociations.prototype.getHasOneJoin = function(assoc, cb) {
  cb(null);
};


/**
 * Builds a SQL JOIN snippet when the main model has/owns many entities in the
 * associated model's table. For example, a User has many Posts.
 * @param {!Object} assoc Object containing the model's associations' mapping.
 * @return {string} The SQL snippet for the JOIN.
 */
ModelAssociations.prototype.getHasManyJoin = function(assoc, cb) {
  cb(null);
};


/**
 * Determines what method to use to build the JOIN snippet.
 * @param {string} relationship The relationship to determine join logic.
 * @return {function(Object, function)} The join getter method.
 */
ModelAssociations.prototype.getJoinMethod = function(relationship) {
  var getter;
  switch (relationship) {
    case 'belongsTo':
      getter = this.getBelongsToJoin;
      break;
    case 'habtm':
      getter = this.getHABTMJoin;
      break;
    case 'hasOne':
      getter = this.getHasOneJoin;
      break;
    case 'hasMany':
      getter = this.getHasManyJoin;
      break;
  }
  return getter;
};


/**
 * Loops through all (or any) model associations, and builds JOIN SQL snippets
 * for each. When all the operations are done, it fires the callback. If no
 * associations are available, the process exits and the callback is fired.
 * @param {function(Array)} done Callback to fire with results when done.
 */
ModelAssociations.prototype.getModelAssociations = function(done) {
  var assocList = this.assocList_,
      self = this;

  if (assocList) {
    assocList.forEach(function(a) {
      var assoc = this.associations_[a],
          getter = this.getJoinMethod(assoc.relationship);

      // Run the getter method, and fire the callback if it is the last one.
      getter.call(this, assoc, function(result) {
        self.joinStrings_.push(result);
        if (self.joinStrings_.length === assocList.length) {
          done(self.joinStrings_.join(''));
        }
      });
    }, this);
  } else {
    done();
  }
};


/**
 * Expose the ModelAssociations Library.
 */
module.exports = ModelAssociations;
