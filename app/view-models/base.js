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
   * @private {!Object.<string>}
   */
  this.settings_ = app.get('publish');

  /**
   * Mongo Database connection.
   * @private {!Object}
   */
  this.dbc_ = this.settings_.mongo;

  /**
   * Optional model resource.
   * @private {?Object}
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
  collection.find().toArray(cb);
};


/**
 * Retrieves a document collection from MongoDB.
 * @param {function(error, array)} cb Callback to fire when done. Sends an error
 *      if one exists, and/or the rows/results.
 */
Base.prototype.findOne = function(cb) {};


