const BaseController = require('./base.controller');
const QueueModel = require('../models/queue.model');
const UserModel = require('../models/users.model');
const Logger = require("../services/log");

const Notifications = require('../services/notifications');

class QueueController extends BaseController {
  // you can override methods in here
  async message(req, res, next) {
    try {
      const { category, message } = req.body;
      const usersWhoAreSubscribed = await UserModel.getBySubscription(category);
      if (usersWhoAreSubscribed && usersWhoAreSubscribed.length > 0) {
        await Promise.allSettled(usersWhoAreSubscribed.map(async (user) => {
          const userNotifications = await UserModel.getNotifications(user.id);

          await Promise.allSettled(userNotifications.map(async (notification) => {
            let log = null;
            let status = 'executed';

            try {
              log = await Notifications[notification.name].run();
            } catch (e) {
              status = 'failed';
              log = e.message;
              Logger.error(e);
            }

            const queueResult = await this.Model.insert({
              user: user.id,
              notification: notification.id,
              category,
              message,
              log: log,
              status: status
            });
          }));
        }));
      }

      res.status(201).send({ result: "ok" });
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
  async history(req, res, next) {
    try {
      const queues = await this.Model.getLog('date', 'DESC');
      res.status(200).send(queues);
    } catch (e) {
      // Log error and format it to send a friendly message to the user
      Logger.log(e);
      next();
    }
  }
}

module.exports = new QueueController(QueueModel);
