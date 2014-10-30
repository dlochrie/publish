var mongo = require('../../config/mongo'),
    should = require('should');

describe('mongo configuration test', function() {
  it('should make a connection to the mongo database', function(done) {
    // Since the mongo.connect method is asynchronous, emulate async with a
    // timeout.
    setTimeout(function(){
      mongo(app);
      app.should.be.a.Function;
      app.settings.mongo.should.be.an.Object;
      app.settings.mongo.should.have.property('databaseName');
      app.settings.mongo.should.have.property('serverConfig');
      done();
    }, 100);
  });

  it('should fail connecting with invalid parameters', function(done) {
    // Since the mongo.connect method is asynchronous, emulate async with a
    // timeout.
    setTimeout(function(){
      throw new Error('Please implement');
      done();
    }, 100);
  });
});
