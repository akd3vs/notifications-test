const Logger = require("../services/log");
const CategoryModel = require("../models/categories.model");

class BaseController {
  /**
   *
   * @type {import('../models/base.model').default} model a BaseModel instance
   */
  Model = null;
  constructor(model) {
    this.Model = model;
  }

  async get(req, res, next) {
    try {
      const results = await this.Model.get();
      res.status(200).send(results);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
  async getById(req, res, next) {
    try {
      const result = await this.Model.getById(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }

  async create(req, res, next) {
    const objectProps = req.body;

    try {
      const newObject = await this.Model.insert(objectProps);
      res.status(201).send(newObject);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }

  async update(req, res, next) {
    const objectProps = req.body;

    try {
      const newObject = await this.Model.update(req.params.id, objectProps);
      res.status(201).send(newObject);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }

  async remove(req, res, next) {
    const objectProps = req.body;

    try {
      const newObject = await this.Model.remove(req.params.id);
      res.status(201).send(newObject);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
}

module.exports = BaseController;
