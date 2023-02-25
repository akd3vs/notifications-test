const NotificationsController = require('../controllers/notifications.controller');
const BaseRoutes = require('./base.routes');

class NotificationsRoutes extends BaseRoutes {
  // you can override methods in here
}

module.exports = (app) => new NotificationsRoutes(app, 'notifications', NotificationsController);
