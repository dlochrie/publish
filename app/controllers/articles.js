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
ArticlesController.prototype.index = function(req, res) {
  var viewModel = new ArticleVM(req.app);
  viewModel.find(function(err, articles) {
    // TODO: Handle errors...
    res.render('articles/index', {
      articles: articles,
      title: 'Posts Administration'
    });
  });
};


/**
 * Displays an article.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ArticlesController.prototype.show = function(req, res) {
  var slug = req.params.id;
  var viewModel = new ArticleVM(req.app, {slug: slug});
  viewModel.findOne(function(err, article) {
    // TODO: Handle errors...
    if (err || !article) {
      res.render('error', {
        message: 'The article you were looking for could not be found.'
      });
    } else {
      res.render('articles/show', {
        article: article,
        title: article.title
      });
    }
  });
};
