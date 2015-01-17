/**
 * The Messages library provides methods for displaying messages of various
 * types. It is used for "flashing" errors and info notifications on rendered
 * views using the session object.
 */
var util = require('util');



/**
 * Constructor for the Messages Library.
 * @constructor
 */
function Messages() {
  /**
   * Default messages for actions / operations. Exposed here for use in tests.
   * @enum {string}
   */
  this.defaultMessages = {
    error: 'An error was encountered with the previous operation. ' +
        'Please try again.',
    info: 'FYI: The previous action/operation ran with warnings, but did not ' +
        'encounter any errors. That\'s all we know.',
    success: 'The previous action/operation was successful.'
  };
}


/**
 * Appends a message of certain type to the messages array. If the session does
 * not contain a "messages" property for a particular type, one is created. If
 * a session is unavailable, a message is not created at all.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 * @param  {string} type The type of message (info, error, success, etc).
 */
Messages.prototype.append = function(session, msg, type) {
  if (session) {
    var messages = session.messages = session.messages || {};
    msg = msg || this.defaultMessages[type];

    if (messages[type] && util.isArray(messages[type])) {
      messages[type].push(msg);
    } else {
      messages[type] = [msg];
    }
  }
};


/**
 * Adds an error message to the session.messages object.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 */
Messages.prototype.appendError = function(session, msg) {
  this.append(session, msg, 'error');
};


/**
 * Adds an info message to the session.messages object.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 */
Messages.prototype.appendInfo = function(session, msg) {
  this.append(session, msg, 'info');
};


/**
 * Adds a success message to the session.messages object.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 */
Messages.prototype.appendSuccess = function(session, msg) {
  this.append(session, msg, 'success');
};


/**
 * Expose the Messages Library.
 */
module.exports = new Messages;
