var Mongo = require('../../config/mongo');

describe('mongo configuration test', function() {
  var mongo, appSettings, mongoSettings;

  describe('when successfully configured', function() {
    beforeEach(function(done) {
      // Since it takes a second or two to connect, emulate some time passing.
      setTimeout(function() {
        mongo = new Mongo(app);
        mongo.should.be.an.Object;
        done();
      }, 100);
    });

    it('should make a connection to the mongo database', function(done) {
      app.should.be.a.Function;
      appSettings = app.settings.publish;
      mongoSettings = appSettings['mongo'];
      mongoSettings.should.be.an.Object;
      mongoSettings.should.have.property('databaseName');
      mongoSettings.should.have.property('serverConfig');
      done();
    });
  });

  describe('when unsuccessfully configured', function() {
    beforeEach(function(done) {
      mongoSettings = null;
      done();
    });

    it('should fail connecting with invalid parameters', function(done) {
      appSettings['MONGO CONNECTION STRING'] = 'blah';
      // To test for thrown errors, we must wrap the methods in anonymous
      // functions.
      (function() {
        mongo = new Mongo(app);
      }).should.throw(
          'URL must be in the format mongodb://user:pass@host:port/dbname');
      done();
    });

    it('should fail connecting with a missing connection string',
       function(done) {
         appSettings['MONGO CONNECTION STRING'] = null;
         // To test for thrown errors, we must wrap the methods in anonymous
         // functions.
         (function() {
           mongo = new Mongo(app);
         }).should.throw(
         'Could not connect to Mongo DB using connection string "undefined"');
         done();
       });
  });
});
