var request = require('supertest');

describe('admin controller test', function() {
  it('should show the admin page', function(done) {
    request(app).
        get('/admin').
        expect('Content-Type', /html/).
        expect(200).
        end(function(err, res) {
          if (res.text) {
            // Assert that all the panel headings are available.
            res.text.should.match(/Manage Posts/);
            res.text.should.match(/Manage Users/);
            res.text.should.match(/Manage Categories/);
            res.text.should.match(/Manage Features/);
          }
          done(err);
        });
  });
});
