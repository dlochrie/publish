var Routes = require('../../config/routes'),
    request = require('supertest');

describe('routes configuration test', function() {
  var router;
  beforeEach(function() {
    router = new Routes(app);
  });

  /**
   * Provides a convenience wrapper for making requests to each route's path.
   * @param {string} route The path to make the GET request against.
   * @param {Function} next The callback to call when done.
   */
  function getRoute(route, next) {
    request(app).
        get(route).
        expect('Content-Type', /html/).
        expect(200).
        end(function(err, res) {
          if (err) throw err;
          next();
        });
  }

  it('should successfully load the routes configuration', function(done) {
    // Get all the routes that match the GET verb. To keep the test simple,
    // we are skipping POST, DELETE, etc.
    var routes = router.getRoutesByVerb('get');

    // Recursively "GET" each route. If any fails, then the test fails.
    function recursiveGet(route) {
      if (route) {
        getRoute(route, function() {
          recursiveGet(routes.shift());
        });
      } else {
        done();
      }
    }

    // Start the proccess.
    recursiveGet(routes.shift());
  });
});
