const CategoriesController = require('../controllers/categories.controller');
const BaseRoutes = require('./base.routes');

class CategoriesRoutes extends BaseRoutes {
  // you can override methods in here
}

module.exports = (app) => new CategoriesRoutes(app, 'categories', CategoriesController);
