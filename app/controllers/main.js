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


/**
 * Renders the about page.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
MainController.prototype.about = function(req, res) {
  res.render('main/about', {title: 'About Us'});
};


/**
 * Renders the contact page.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
MainController.prototype.contact = function(req, res) {
  res.render('main/contact', {title: 'Contact Us'});
};
