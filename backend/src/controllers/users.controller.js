const BaseController = require('./base.controller');
const UsersModel = require('../models/users.model');
const Logger = require("../services/log");

class UsersController extends BaseController {
  // you can override methods in here
  async getSubscriptions(req, res, next) {
    try {
      const { category } = req.body;
      const subscriptions = await this.Model.getSubscriptions(req.params.id, category);
      res.status(200).send(subscriptions);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
  async addSubscription(req, res, next) {
    try {
      await this.Model.addSubscription(req.params.id, req.body.category);
      res.status(201).send({ result: 'ok' });
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
  async removeSubscription(req, res, next) {
    try {
      await this.Model.removeSubscription(req.params.id, req.body.category);
      res.status(201).send({ result: 'ok' });
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
  async getNotifications(req, res, next) {
    try {
      const notifications = await this.Model.getNotifications(req.params.id);
      res.status(200).send(notifications);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
  async addNotification(req, res, next) {
    try {
      await this.Model.addNotification(req.params.id, req.body.notification);
      res.status(201).send({ result: 'ok' });
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
  async removeNotification(req, res, next) {
    try {
      await this.Model.removeNotification(req.params.id, req.body.notification);
      res.status(201).send({ result: 'ok' });
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
}

module.exports = new UsersController(UsersModel);
