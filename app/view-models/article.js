var Base = require('./base');


/**
 * Expose the Article View Model.
 */
module.exports = Article;



/**
 * Article model constructor.
 * @param {express.app} app Express App instance.
 * @param {Object=} opt_resource Optional resource.
 * @constructor
 * @extends {app.models.base}
 */
function Article(app, opt_resource) {
  /**
   * Local reference to the Express app instance.
   * @private {express.app}
   */
  this.app_ = app;

  /**
   * Name of the MongoDB collection to operate on.
   * @private {string}
   */
  this.collectionName_ = 'articles';

  /**
   * Mongo Database connection.
   * @private {!Object}
   */
  this.dbc_ = app.settings.mongo;

  /**
   * Optional model resource.
   * @private {?Object}
   */
  this.resource_ = opt_resource || null;

  // Call the Base instructor to inherit its methods.
  Base.call(this);
}


/**
 * The Article Class inherits the Base class methods.
 */
require('util').inherits(Article, Base);
