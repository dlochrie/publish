var request = require('supertest');

describe('main controller test', function() {
  it('should show the home page', function(done) {
    request(app).
        get('/').
        expect('Content-Type', /html/).
        expect(200).
        end(function(err, res) {
          if (err) throw err;
          done();
        });
  });
});
