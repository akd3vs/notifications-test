const BaseController = require('./base.controller');
const NotificationsModel = require('../models/notifications.model');

class NotificationsController extends BaseController {
  // you can override methods in here
}

module.exports = new NotificationsController(NotificationsModel);
