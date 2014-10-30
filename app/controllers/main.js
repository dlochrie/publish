/**
 * Expose "Main" Controller.
 */
module.exports = new Main;



/**
 * Main Controller.
 * @constructor
 */
function Main() {}


Main.prototype.index = function(req, res) {
  res.render('index', {title: 'Express, through controller'});
};

Main.prototype.about = function(req, res) {
  res.render('index', {title: 'Express, About'});
};

Main.prototype.contact = function(req, res) {
  res.render('index', {title: 'Express, Contact'});
};
