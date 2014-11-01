var Globals = require('../../config/globals'),
    json = require('../../config/globals.json');

describe('globals configuration test', function() {
  var keys = [];

  beforeEach(function(done) {
    // Get a list of keys to check for existence and definition.
    for (var prop in json.properties) {
      keys.push(json.properties[prop].name);
    }
    done();
  });

  it('should define application settings based on the globals configuration',
      function(done) {
       app.should.be.a.Function;
       app.settings.publish.should.be.an.Object;
       // Assert that each key is stored on the application settings, and that each
       // is defined or "truthy".
       keys.forEach(function(key) {
         app.settings.publish.should.have.property(key);
         app.settings.publish[key].should.be.ok;
       });

       var invalid = 'DOES NOT EXIST';
       app.settings.publish.should.not.have.property(invalid);
       (app.settings.publish[invalid] === undefined).should.be.true;
       done();
     });
});
