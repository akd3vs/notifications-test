const categoriesRoutes = require('./categories.routes');
const notificationsRoutes = require('./notifications.routes');
const usersRoutes = require('./users.routes');
const queueRoutes = require('./queue.routes');

const routes = app => {
  categoriesRoutes(app);
  notificationsRoutes(app);
  usersRoutes(app);
  queueRoutes(app);
};

module.exports = routes;
