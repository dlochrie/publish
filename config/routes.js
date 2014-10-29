var express = require('express'),
    router = express.Router(),
    path = require('path'),
    ctrlDir = ('../app/controllers/');


// Get a reference to each controller.
var main = require(path.join(ctrlDir, 'main'));


// Resolve the routes to the appropriate controller.method handler.
router.get('/', main.index);


/**
 * Expose the Router Module.
 */
module.exports = router;
