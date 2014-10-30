module.exports = Base;



/**
 * Constructor for the Base View Model Class.
 * @constructor
 */
function Base() {}


/**
 * Retrieves a document collection from MongoDB.
 */
Base.prototype.find = function(cb) {
  var collection = this.dbc_.collection(this.collectionName_);
  collection.find().toArray(cb);
};

Base.prototype.findOne = function() {};


