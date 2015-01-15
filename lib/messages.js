var util = require('util');


/**
 * Appends a message of certain type to the messages array. Used for "flashing"
 * errors and info notifications. If the session does not contain a "messages"
 * property for a particular type, one is created.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 * @param  {string} type The type of message (info, error, success, etc).
 */
function append(session, msg, type) {
  var messages = session.messages = session.messages || {};

  if (messages[type] && util.isArray(messages[type])) {
    messages[type].push(msg);
  } else {
    messages[type] = [msg];
  }
}


/**
 * Adds an error message to the session.messages object.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 */
exports.appendError = function(session, msg) {
  append(session, msg, 'error');
};


/**
 * Adds an info message to the session.messages object.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 */
exports.appendInfo = function(session, msg) {
  append(session, msg, 'info');
};


/**
 * Adds a success message to the session.messages object.
 * @param  {!Object} session The Express session object.
 * @param  {string} msg The message to display.
 */
exports.appendSuccess = function(session, msg) {
  append(session, msg, 'success');
};
