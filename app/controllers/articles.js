var ArticleVM = require('../view-models/article');


/**
 * Expose "Articles" Controller.
 */
module.exports = new ArticlesController;



/**
 * Constructor for the ArticlesController.
 * @constructor
 */
function ArticlesController() {}


/**
 * Renders articles' index page - lists all articles.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ArticlesController.prototype.index = function(req, res, next) {
  var viewModel = new ArticleVM(req.app);
  viewModel.find(function(err, rows) {
    res.render('articles/index', {
      rows: rows,
      title: 'Publish: Articles Home'
    });
  });
};
