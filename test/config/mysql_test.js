var MySQL = require('../../config/mysql'),
    clone = require('node-v8-clone').clone;

describe('mysql configuration test', function() {
  var mysql, connection;

  // In order to avoid changing the global "app", we make a deep copy and use
  // that for the tests.
  var appCopy = clone(app, true);
  appCopy.should.not.equal(app);

  /**
   * Makes a connection to the MySQL Database given params defined on
   * app.settings. The connection is wrapped in a timeout to emulate the time
   * that it takes to make the connection.
   * @param {Function(string)} cb Callback to fire when done.
   */
  function makeConnection(cb) {
    setTimeout(function() {
      mysql = new MySQL(appCopy);
      mysql.should.be.an.Object;
      connection = appCopy.settings.publish['mysql'];
      connection.should.be.an.Object;
      connection.should.have.property('config');
      connection.should.have.property('_maxListeners');
      cb();
    }, 100);
  }

  /**
   * Tests a connection by performing a basic SELECT statement on a known
   * table.
   * @param {Function(string)} cb Callback to fire when done.
   */
  function testConnection(cb) {
    connection.getConnection(function(err, connection) {
      if (err) {
        cb(err);
      } else {
        connection.query('SELECT * FROM post', function(err, rows) {
          connection.release();
          cb(err);
        });
      }
    });
  }

  describe('when successfully configured', function() {
    beforeEach(makeConnection);

    it('should make a connection to the mysql database', function(done) {
      testConnection(function(err) {
        var hasError = !!err;
        (hasError).should.be.false;
        done();
      });
    });
  });

  describe('when unsuccessfully configured', function() {
    it('should fail connecting with an invalid password', function(done) {
      appCopy.settings.publish['MYSQL PASS'] = 'wrong';
      makeConnection(function() {
        testConnection(function(err) {
          var hasError = !!err;
          (hasError).should.be.true;
          err.message.should.match(/ER_ACCESS_DENIED_ERROR/);
          done();
        });
      });
    });

    it('should fail connecting with a missing password', function(done) {
      appCopy.settings.publish['MYSQL PASS'] = null;
      makeConnection(function() {
        testConnection(function(err) {
          var hasError = !!err;
          (hasError).should.be.true;
          err.message.should.match(/ER_ACCESS_DENIED_ERROR/);
          done();
        });
      });
    });

    it('should fail connecting with an invalid host url', function(done) {
      appCopy.settings.publish['MYSQL HOST'] = 'http://wrong.com';
      makeConnection(function() {
        testConnection(function(err) {
          var hasError = !!err;
          (hasError).should.be.true;
          err.message.should.match(/ENOTFOUND/);
          done();
        });
      });
    });
  });
});
