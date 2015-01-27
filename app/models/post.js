var Base = require('./base'),
    util = require('util');


/**
 * Expose the Post View Model.
 */
module.exports = Post;



/**
 * Post model constructor.
 * @param {express.app} app Express App instance.
 * @param {Object=} opt_resource Optional resource.
 * @constructor
 * @extends {app.viewModels.base}
 */
function Post(app, opt_resource) {
  /**
   * Object mapping associated models and their relationships.
   * @enum {!Object.<string, Object>}
   */
  this.modelAssociations = Post.MODEL_ASSOCIATIONS_;

  /**
   * Object mapping the Model/Table Structure.
   * @enum {!Object.<string, string>}
   */
  this.structure = Post.STRUCTURE_;

  /**
   * List of columns used for SELECT queries.
   * @type {!Array.<string>}
   */
  this.tableColumns = Post.SELECT_COLUMNS_;

  /**
   * Name of the MongoDB collection to operate on.
   * @type {string}
   */
  this.tableName = 'post';

  // Call the Base instructor to inherit its methods.
  Base.call(this, app, opt_resource);
}


/**
 * The Post Class inherits the Base class methods.
 */
require('util').inherits(Post, Base);


/**
 * Mapping of associated models, and their relationship to this model.
 * @enum {!Object.<string, Object>}
 * @private
 */
Post.MODEL_ASSOCIATIONS_ = {
  user: {
    relationship: 'belongsTo',
    tableName: 'user',
    foreignKey: 'user_id'
  },
  categories: {
    relationship: 'habtm',
    tableName: 'post_category'
  }
};


/**
 * Columns to retrieve in SELECT statements.
 * @const
 * @private {!Array.<string>}
 */
Post.SELECT_COLUMNS_ = [
  'post.id',
  'post.title',
  'post.description',
  'post.description_md',
  'post.body',
  'post.body_md',
  'post.slug',
  'post.created',
  'post.updated',
  'user.display_name',
  'user.email',
  'user.id',
  'user.slug'
];


/**
 * Table structure. Describes field types and validation properties.
 * Note: Fields that will get generated (i.e. date, markdown formatted content)
 *   should NOT be required - they will always fail validation if they are.
 * @enum {Object.<string, string>}
 * @private
 */
Post.STRUCTURE_ = {
  id: {type: 'Number'},
  user_id: {type: 'Number', length: 10, required: true, displayName: 'User'},
  title: {type: 'String', length: 255, required: true, displayName: 'Title'},
  slug: {type: 'String', length: 255},
  description: {type: 'Text'},
  description_md: {type: 'Text', required: true, displayName: 'Description'},
  body: {type: 'Text'},
  body_md: {type: 'Text', required: true, displayName: 'Body'},
  created: {type: 'Number', required: false},
  updated: {type: 'Number', required: false}
};
