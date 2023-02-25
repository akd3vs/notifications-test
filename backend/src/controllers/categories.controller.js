const BaseController = require('./base.controller');
const CategoriesModel = require('../models/categories.model');

class CategoriesController extends BaseController {
  // you can override methods in here
}

module.exports = new CategoriesController(CategoriesModel);
