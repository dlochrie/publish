var Articles = require('../../app/view-models/article')
var express = require('express');
var path = require('path');
var seeds = require('./seed.json')
var app = express();

// Bootstrap the file with the necessary configuration.
var confs = ['globals', 'mongo'];
confs.forEach(function(name) {
  var file = path.join('../../config', name);
  var Config = require(file);
  new Config(app);
});

/**
 * Sets a timeout that clears and executes when the Mongo connection is
 * available.
 * @param {!express.app} app Express App instance.
 * @param {!Function} done The callback to fire when Mongo is available.
 */
function waitForMongo(app, done) {
  var timeout = setInterval(function() {
    var settings = app.get('publish');
    if (settings.mongo) {
      clearTimeout(timeout);
      done();
    } else {
      waitForMongo(app, done);
    }
  }, 100);
}

// Attempt to seed the Mongo DB, first removing all records then adding the
// new ones.
waitForMongo(app, function() {
  for (var model in seeds) {
    var article = new Articles(app, seeds[model]);

    // First purge/trucate the collection, then seed it.
    article.purge(function(err) {
      if (err) {
        console.log('Something went wrong!!!', err);
      } else {
        article.insert(function(err, doc) {
          if (!err && doc) {
            console.log('Seeding the Mongo DB was successful.');
          } else {
            console.log('Something went wrong!!!', err);
          }
          process.exit(code=0);
        });
      }
    });
  }
});
