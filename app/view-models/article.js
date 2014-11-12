var Base = require('./base');


/**
 * Expose the Article View Model.
 */
module.exports = Article;



/**
 * Article view model constructor.
 * @param {express.app} app Express App instance.
 * @param {Object=} opt_resource Optional resource.
 * @constructor
 * @extends {app.viewModels.base}
 */
function Article(app, opt_resource) {
  /**
   * Name of the MongoDB collection to operate on.
   */
  this.collectionName = 'articles';

  // Call the Base instructor to inherit its methods.
  Base.call(this, app, opt_resource);
}


/**
 * The Article Class inherits the Base class methods.
 */
require('util').inherits(Article, Base);
