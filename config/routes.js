/**
 * Configuration for the application's routes.
 */
var express = require('express'),
    router = express.Router(),
    path = require('path'),
    ctrlDir = ('../app/controllers/');


// Get a reference to each controller.
var main = require(path.join(ctrlDir, 'main'));
var articles = require(path.join(ctrlDir, 'articles'));


// Resolve the routes to the appropriate controller.method handler.
router.get('/', main.index);
router.get('/articles', articles.index);


/**
 * Configures the routes for the application by attaching the router middlewhere
 * to the Express app.
 * @param {!express} app The express application instance.
 */
function Router(app) {
  app.use(router);
}


/**
 * Expose the Router Module.
 */
module.exports = Router;
