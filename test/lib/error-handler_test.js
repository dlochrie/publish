var errorHandler = require('../../lib/error-handler'),
    sinon = require('sinon');

describe('error handler library', function() {
  it('should throw a 404 when a page is not found', function() {
    var req = {}, res = {};
    errorHandler.pageNotFound(req, res, function(err) {
      err.should.be.an.Error;
      err.message.should.equal('Not Found');
      err.status.should.equal(404);
    });
  });

  it('should render the error page when an error is encountered', function() {
    var req = {
      app: {
        get: function() {}
      }
    };

    var res = {
      render: function() {},
      status: function() {}
    };

    var error = new Error('Test Error'),
        spy = sinon.spy(res, 'render');

    var expectedViewValues = {
      message: 'Test Error',
      error: error
    };

    // Assert that the error page is rendered with the expectedViewValues.
    errorHandler.pageError(error, req, res);
    spy.calledWith('error', expectedViewValues).should.be.true;
  });
});
