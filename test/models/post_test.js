Post = require('../../app/models/post');

describe('post model test', function() {
  var post;

  beforeEach(function(done) {
    post = new Post(app);
    done();
  });

  it('should inherit from the base model class', function() {
    post.should.be.an.Object.and.have.properties(
        ['find', 'findOne', 'select', 'getColumns']);
  });

  it('should provide default values', function() {
    post.modelAssociations.should.equal(Post.MODEL_ASSOCIATIONS_);
    post.tableColumns.should.equal(Post.SELECT_COLUMNS_);
    post.structure.should.equal(Post.STRUCTURE_);
  });

  it('should provide a model associations object', function() {
    post.modelAssociations.should.be.an.Object.and.have.properties(
        ['user', 'categories']);
  });

  it('should provide a list of select columns', function() {
    post.tableColumns.should.be.an.Array;
    post.tableColumns.indexOf('post.title').should.not.eql(-1);
    post.tableColumns.indexOf('post.description').should.not.eql(-1);
    // Control value.
    post.tableColumns.indexOf('invalid').should.eql(-1);
  });

  it('should provide a model structure', function() {
    post.structure.should.be.an.Object.and.have.properties(
        ['user_id', 'title', 'slug']);
  });
});
