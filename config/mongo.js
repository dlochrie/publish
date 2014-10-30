/**
 * Configuration for the MongoDB client connection.
 * Since the MongoDB connection handles it's own pooling, we only need one
 * connection for the application.
 */
var MongoClient = require('mongodb').MongoClient;



/**
 * Configures the MongoDB connection.
 * @param {!express} app The express application instance.
 */
function Mongo(app) {
  // Connection URL
  var url = 'mongodb://localhost:27017/publish';

  // Connect to Mongo DB.
  MongoClient.connect(url, function(err, db) {
    // Store the Mongo DBC on the Express "app" object.
    app.set('mongo', db);
    // TODO: Handle Errors.
  });
}


/**
 * Expose the Mongo Module.
 */
module.exports = Mongo;
