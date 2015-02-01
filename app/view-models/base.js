/**
 * Expose the Base View Model.
 */
module.exports = Base;



/**
 * Constructor for the Base View Model Class.
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
   * Mongo Database connection.
   * @type {!Object}
   * @private
   */
  this.dbc_ = this.settings_.mongo;

  /**
   * Optional model resource.
   * @type {?Object}
   * @private
   */
  this.resource_ = opt_resource || null;
}


/**
 * Retrieves a document collection from MongoDB.
 * @param {function(error, array)} cb Callback to fire when done. Sends an error
 *      if one exists, and/or the rows/results.
 */
Base.prototype.find = function(cb) {
  var collection = this.dbc_.collection(this.collectionName);
  collection.find(this.resource_).toArray(cb);
};


/**
 * Retrieves a document collection from MongoDB. Returns one result.
 * @param {function(error, array)} cb Callback to fire when done. Sends an error
 *      if one exists, and/or the rows/results.
 */
Base.prototype.findOne = function(cb) {
  var collection = this.dbc_.collection(this.collectionName);
  collection.findOne(this.resource_, cb);
};


/**
 * Inserts the a document in the collection.
 * @param  {!Function} cb Callback to fire when done.
 */
Base.prototype.insert = function(cb) {
  var collection = this.dbc_.collection(this.collectionName);
  collection.insert(this.resource_, cb);
};


/**
 * Purges all documents in the collection. Not the same a simple "remove".
 * @param  {!Function} cb Callback to fire when done.
 */
Base.prototype.purge = function(cb) {
  var collection = this.dbc_.collection(this.collectionName);
  if (collection) {
    collection.remove({}, cb);
  } else {
    cb();
  }
};
