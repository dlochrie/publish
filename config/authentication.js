var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



/**
 * Configuration for the Authentication Logic.
 * @param {!express} app The express application instance.
 * @constructor
 */
function Authentication(app) {
  /**
   * Reference to the "publish" app settings.
   * @private {!Object.<string>}
   */
  this.settings_ = app.get('publish');

  /**
   * Base/Root URL for the application.
   * @private {string}
   */
  this.callbackURL_ = this.settings_['ROOT URL'];

  /**
   * Google callback URL.
   * @private {string}
   */
  this.googleCallbackURL_ = this.callbackURL_ + 'auth/google/callback';

  /**
   * Google Client ID for this application.
   * @private {string}
   */
  this.googleClientId_ = this.settings_['GOOGLE CLIENT ID'];

  /**
   * Google Client Secret for this application.
   * @private {string}
   */
  this.googleClientSecret_ = this.settings_['GOOGLE CLIENT SECRET'];

  // Initialize the Authentication module.
  this.init_();
}


/**
 * Initializes the Authentication middleware.
 * @private
 */
Authentication.prototype.init_ = function() {
  //Register Serialization and Deserialization logic for all passport providers.
  passport.serializeUser(this.serializeUser_);
  passport.deserializeUser(this.deserializeUser_);

  passport.use(new GoogleStrategy({
    clientID: this.googleClientId_,
    clientSecret: this.googleClientSecret_,
    callbackURL: this.googleCallbackURL_
  },
  function(accessToken, refreshToken, profile, done) {
    // TODO: Handle errors here.
    // TODO: Handle Tokens, and refreshed / timeout.
    return done(null, profile);
  }
  ));
};


/**
 * Serializes the user into the session.
 * TODO: It might not be necessary to prvide the whole User object, just parts.
 * @param {!Object} user The user object. This comes from the provider's
 *     (Google, Facebook, etc) response.
 * @param {!Function} done Callback to fire when done.
 * @private
 */
Authentication.prototype.serializeUser_ = function(user, done) {
  done(null, user);
};


/**
 * Deserializes the user out of the session.
 * @param {!Object} user The serialized User object.
 * @param {!Function} done Callback to fire when done.
 * @private
 */
Authentication.prototype.deserializeUser_ = function(user, done) {
  done(null, user);
};


/**
 * Expose the Router Module.
 */
module.exports = Authentication;
