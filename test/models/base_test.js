var Base = require('../../app/models/base'),
    Post = require('../../app/models/post'),
    util = require('util');

describe('base model test', function() {
  var base;

  /**
   * In order to test to test inhereited/extended properties and methods,
   * we will emulate a common model: Post.
   * @param {Function} done Callback to fire when done.
   */
  function loadTestModel(done) {
    base = new Base(app);
    base.modelAssociations = Post.MODEL_ASSOCIATIONS_;
    base.structure = Post.STRUCTURE_;
    base.tableColumns = Post.SELECT_COLUMNS_;
    base.tableName = 'post';
    done();
  }

  describe('when setting defaults and initialization', function() {
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
    beforeEach(loadTestModel);

    it('should find all the records for a model', function(done) {
      base.find(function(err, results) {
        (err === null).should.be.true;
        results.should.be.an.Array;
        done();
      });
    });

    it('should find one record for a model', function(done) {
      base.findOne(function(err, result) {
        (err === null).should.be.true;
        result.should.be.an.Object.and.have.properties('post', 'user');
        done();
      });
    });

    it('should perform a SELECT query', function(done) {
      var query = util.format(Base.SELECT_QUERY_STRING_WITHOUT_JOIN_,
          base.tableName),
          columns = ['id', 'title'],
          where = base.getQueryObject() || Base.DEFAULT_WHERE_VALUE_;

      base.select(query, columns, where, function(err, results) {
        (err === null).should.be.true;
        results.should.be.an.Array;
        var first = results[0];
        first.should.be.an.Object.and.have.property('post');
        first.post.should.have.properties(columns);
        done();
      });
    });

    it('should display an error with missing or incomplete data',
        function(done) {
          base.modelAssociations = {};
          base.tableColumns = [];
          base.find(function(err, results) {
            err.should.be.an.Error;
            err.message.should.match(
                /ER_PARSE_ERROR: You have an error in your SQL syntax/);
            done();
          });
        });
  });

  describe('utility methods', function() {
    beforeEach(loadTestModel);

    it('should get a model\'s columns when the subclass provides them',
        function() {
         base.getColumns().should.eql(Post.SELECT_COLUMNS_);
       });

    it('should return an empty array when the subclass does not provide columns',
        function() {
          base.tableColumns = null;
          base.getColumns().should.eql([]);
          base.tableColumns = undefined;
          base.getColumns().should.eql([]);
          base.tableColumns = 0;
          base.getColumns().should.eql([]);
       });

    it('should get a query object for a given model resource', function() {
      base.resource_ = {id: 1234};
      base.getQueryObject().should.eql({'post.id': 1234});
      base.resource_ = {id: 1234, body: 'Some text here'};
      base.getQueryObject().should.eql({
        'post.id': 1234,
        'post.body': 'Some text here'
      });
    });

    it('should be undefined when looking for a queryObject without a resource',
       function() {
         [null, undefined, 'a string', 123, []].forEach(function(test) {
           base.resource_ = test;
           (base.getQueryObject() === undefined).should.be.true;
         });
       });

    it('should log queries when query logging is enabled', function(done) {
      done(new Error('Please implement.'));
    });

    it('should determine if a variable is an object or not', function() {
      [{foo: 'bar'}, {}, base].forEach(function(test) {
        Base.isObject_(test).should.be.true;
      });

      [null, undefined, 'a string', 123, []].forEach(function(test) {
        Base.isObject_(test).should.be.false;
      });
    });
  });
});
