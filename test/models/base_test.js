var Base = require('../../app/models/base'),
    Post = require('../../app/models/post');

describe('base model test', function() {
  describe('when setting defaults and initialization', function() {
    var base;

    it('should provide default values', function(done) {
      base = new Base(app);
      base.settings_.should.be.an.Object.and.have.properties('mysql', 'mongo');
      base.dbc_.should.be.an.Object;
      (base.resource_ === null).should.be.true;
      done();
    });

    it('should initialize a resource when one is provided', function(done) {
      base = new Base(app, {foo: 'bar'});
      base.resource_.should.be.an.Object.and.have.property('foo', 'bar');
      done();
    });
  });

  describe('when performing queries', function() {
    var post;

    it('should find all the records for a model', function(done) {
      post = new Post(app);
      post.find(function(err, results) {
        (err === null).should.be.true;
        results.should.be.an.Array;
        done();
      });
    });

    it('should find one record for a model', function(done) {
      done(new Error('Please implement.'));
    });

    it('should perform a SELECT query', function(done) {
      done(new Error('Please implement.'));
    });
  });

  describe('utility methods', function() {
    it('should get a model\'s columns', function(done) {
      done(new Error('Please implement.'));
    });

    it('should get a query string for a given action', function(done) {
      done(new Error('Please implement.'));
    });

    it('should get a query object for a given model resource', function(done) {
      done(new Error('Please implement.'));
    });

    it('should log queries when query logging is enabled', function(done) {
      done(new Error('Please implement.'));
    });
  });
});
