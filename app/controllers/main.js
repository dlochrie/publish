var ArticleVM = require('../view-models/article');


/**
 * Expose "Main" Controller.
 */
module.exports = new MainController;



/**
 * Constructor for the MainController.
 * @constructor
 */
function MainController() {}


/**
 * Renders the home page - lists all articles.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
MainController.prototype.index = function(req, res) {
  var viewModel = new ArticleVM(req.app);
  viewModel.find(function(err, rows) {
    res.render('main/index', {
      rows: rows,
      title: 'Publish: Home Page'
    });
  });
};

MainController.prototype.about = function(req, res) {
  res.render('main/index', {title: 'Express, About'});
};

MainController.prototype.contact = function(req, res) {
  res.render('main/index', {title: 'Express, Contact'});
};
