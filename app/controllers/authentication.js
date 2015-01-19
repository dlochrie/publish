var passport = require('passport');


/**
 * Expose the "Authentication" Controller.
 */
module.exports = new AuthenticationController;



/**
 * Constructor for the AuthenticationController.
 * @constructor
 */
function AuthenticationController() {}


/**
 * Makes a request to Google for authentication with the OAuth 2.0 protocol.
 * GET /auth/google
 */
AuthenticationController.prototype.requestGoogleAuthentication =
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    });


/**
 * Injects the Passport middleware into the Google OAuth 2.0 response.
 * GET /auth/google/callback
 */
AuthenticationController.prototype.authenticateWithGoogle =
    passport.authenticate('google', {
      failureFlash: true,
      failureRedirect: '/login'
    });


/**
 * Handles Google OAuth 2.0 Response after the passport middleware is processed.
 * Typically sets the "loggedIn" session variable to true, and redirects back to
 * the home page.
 * GET /auth/google/callback
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
AuthenticationController.prototype.handleGoogleResponse = function(req, res) {
  var session = req.session;
  if (session.passport.user) {
    session.loggedIn = true;
  }
  res.redirect('/');
};


/**
 * Logs the user out.
 * If there is a session, it will be regenerated with a clean session.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
AuthenticationController.prototype.logout = function(req, res) {
  // Clear the user object.
  res.locals.user = {};

  // Removes/clears the passport object from the session.
  req.logout();

  // Clear the session and generate a new one.
  var session = req.session;
  session.loggedIn = false;
  session.regenerate(function(err) {
    res.redirect('/');
  });
};
