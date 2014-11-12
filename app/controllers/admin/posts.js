var Post = require('../../models/post');


/**
 * Expose the "PostsAdministration" Controller.
 */
module.exports = new PostsAdministrationController;



/**
 * Constructor for the PostsAdministrationController.
 * @constructor
 */
function PostsAdministrationController() {}


/**
 * Renders the posts' administration panel.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
PostsAdministrationController.prototype.index = function(req, res) {
  var post = new Post(req.app);
  post.find(function(err, rows) {
    res.render('admin/posts/index', {
      rows: rows,
      title: 'Posts Administration'
    });
  });
};
