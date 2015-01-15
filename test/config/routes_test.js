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

  it('should get routes for the application', function(done) {
    // Get all the routes that match the GET verb. To keep the test simple,
    // we are skipping POST, DELETE, etc.
    var routes = router.getRoutesByVerb('get'),
        hasParamRegex = /.*:{1}[\w]+/;

    // Recursively "GET" each route. If any fails, then the test fails. Skips
    // routes with parameters (:param).
    function recursiveGet(route) {
      if (route) {
        if (!hasParamRegex.test(route)) {
          getRoute(route, function() {
            recursiveGet(routes.shift());
          });
        } else {
          recursiveGet(routes.shift());
        }
      } else {
        done();
      }
    }

    // Start the proccess.
    recursiveGet(routes.shift());
  });

  it('should get a list of routes for a verb', function(done) {
    var routes;

    router.routes_ = {
      foo: [
        {'verb': 'get', 'path': '/test-a1', 'action': 'index'},
        {'verb': 'get', 'path': '/test-a2', 'action': 'index'},
        {'verb': 'post', 'path': '/test-a3', 'action': 'index'}
      ],
      bar: [
        {'verb': 'get', 'path': '/test-b1', 'action': 'index'},
        {'verb': 'post', 'path': '/test-b2', 'action': 'index'},
        {'verb': 'delete', 'path': '/test-b3', 'action': 'index'}
      ]
    };

    routes = router.getRoutesByVerb('get');
    routes.should.have.lengthOf(3);
    routes.should.eql(['/test-a1', '/test-a2', '/test-b1']);

    routes = router.getRoutesByVerb('post');
    routes.should.have.lengthOf(2);
    routes.should.eql(['/test-a3', '/test-b2']);

    routes = router.getRoutesByVerb('delete');
    routes.should.have.lengthOf(1);
    routes.should.eql(['/test-b3']);

    routes = router.getRoutesByVerb(null);
    routes.should.be.Array;
    routes.should.have.lengthOf(0);

    routes = router.getRoutesByVerb('not a verb');
    routes.should.be.Array;
    routes.should.have.lengthOf(0);
    done();
  });

  it('should get a controller', function(done) {
    var main = router.getController('main');
    main.should.be.an.Object;
    main.should.have.property('index');
    done();
  });

  it('should fail to get non-existent controllers', function(done) {
    // To test for thrown errors, we must wrap the methods in
    // anonymous functions.
    (function() {
      router.getController('undef');
    }).should.throw(
        'Could not load the "undef" controller: Error: Cannot find module ' +
        '\'../app/controllers/undef\'');

    (function() {
      router.getController(null);
    }).should.throw(
        'Could not load the "null" controller: TypeError: ' +
        'Arguments to path.join must be strings');

    done();
  });
});
