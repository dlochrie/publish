var messagesLib = require('../../lib/messages');


describe('messages library', function() {
  var session, message;
  var messageActions = {
    error: 'appendError',
    info: 'appendInfo',
    success: 'appendSuccess'
  };

  beforeEach(function() {
    // Reset the messages object before each test.
    session = {
      messages: {}
    };
  });

  it('should append an error message to the messages object', function() {
    message = 'Error Message';
    session.messages.should.be.empty;

    // Assert that a new message both populates the message object, and adds
    // a value to the list.
    messagesLib.appendError(session, message);
    session.messages.error.should.be.an.Array.and.containEql(message);
  });

  it('should append an info message to the messages object', function() {
    message = 'Info Message';
    session.messages.should.be.empty;

    // Assert that a new message both populates the message object, and adds
    // a value to the list.
    messagesLib.appendInfo(session, message);
    session.messages.info.should.be.an.Array.and.containEql(message);
  });

  it('should append a success message to the messages object', function() {
    message = 'Success Message';
    session.messages.should.be.empty;

    // Assert that a new message both populates the message object, and adds
    // a value to the list.
    messagesLib.appendSuccess(session, message);
    session.messages.success.should.be.an.Array.and.containEql(message);
  });

  it('should not add a message when a session is not provided', function() {
    session = undefined;
    message = 'Error Message';

    // Assert that session object is still undefined for each of the message
    // types. Messages cannot be appended to an undefined object.
    for (var action in messageActions) {
      var method = messageActions[action];
      messagesLib[method](session, message);
      (session === undefined).should.be.true;
    }
  });

  it('should provide a default message based on type when a message is missing',
      function() {
        message = null;
        // Assert that a default message is provided for each action when a
        // message is missing.
        for (var action in messageActions) {
          var method = messageActions[action];
          var defaultMessage = messagesLib.defaultMessages[action];
          messagesLib[method](session, message);
          session.messages[action].should.be.an.Array.
              and.containEql(defaultMessage);
        }
      });
});
