const CategoriesController = require("../controllers/categories.controller");

class BaseRoutes {
  /**
   *
   * @param app
   * @param resourceName
   * @param {import('../controllers/base.controller').default} Controller
   * @param {Array<string>} excludeList
   */
  constructor(app, resourceName, Controller, excludeList = []) {
    // @route    GET resource
    // @desc     Get all resources
    // @access   Private
    if (!excludeList.includes('getAll'))
      app.get(`/v1/${resourceName}`, Controller.get.bind(Controller));

    // @route    GET resource
    // @desc     Get single resource
    // @access   Private
    if (!excludeList.includes('getById'))
      app.get(`/v1/${resourceName}/:id`, Controller.getById.bind(Controller));

    // @route    PUT resource
    // @desc     Insert a new resource
    // @access   Private
    if (!excludeList.includes('create'))
      app.put(`/v1/${resourceName}`, Controller.create.bind(Controller));

    // @route    POST resource
    // @desc     Update resource fields
    // @access   Private
    if (!excludeList.includes('update'))
      app.post(`/v1/${resourceName}/:id`, Controller.update.bind(Controller));

    // @route    DELETE resource
    // @desc     Delete resource fields
    // @access   Private
    if (!excludeList.includes('remove'))
      app.delete(`/v1/${resourceName}/:id`, Controller.remove.bind(Controller));
  }
}

module.exports = BaseRoutes;
