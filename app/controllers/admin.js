/**
 * Expose the "Administration" Controller.
 */
module.exports = new AdministrationController;



/**
 * Constructor for the AdministrationController.
 * @constructor
 */
function AdministrationController() {}


/**
 * Renders administration panel.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
AdministrationController.prototype.index = function(req, res) {
  res.render('admin/index', {
    title: 'Admin Panel'
  });
};
