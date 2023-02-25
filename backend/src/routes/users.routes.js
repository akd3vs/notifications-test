const UsersController = require('../controllers/users.controller');
const BaseRoutes = require('./base.routes');

class UsersRoutes extends BaseRoutes {
  // you can override methods in here
  constructor(...props) {
    super(...props);
    const [app, resourceName, Controller] = props;
    app.get(`/v1/${resourceName}/:id/subscriptions`, Controller.getSubscriptions.bind(Controller));
    app.put(`/v1/${resourceName}/:id/subscriptions`, Controller.addSubscription.bind(Controller));
    app.delete(`/v1/${resourceName}/:id/subscriptions`, Controller.removeSubscription.bind(Controller));

    app.get(`/v1/${resourceName}/:id/notifications`, Controller.getNotifications.bind(Controller));
    app.put(`/v1/${resourceName}/:id/notifications`, Controller.addNotification.bind(Controller));
    app.delete(`/v1/${resourceName}/:id/notifications`, Controller.removeNotification.bind(Controller));
  }
}

module.exports = (app) => new UsersRoutes(app, 'users', UsersController);
