const QueueController = require('../controllers/queue.controller');
const BaseRoutes = require('./base.routes');

class QueueRoutes extends BaseRoutes {
  // you can override methods in here
  constructor(...props) {
    const [app, resourceName, Controller] = props;

    app.get(`/v1/${resourceName}/history`, Controller.history.bind(Controller));
    app.put(`/v1/${resourceName}/message`, Controller.message.bind(Controller));

    super(...props);
  }
}

module.exports = (app) => new QueueRoutes(app, 'queue', QueueController);
