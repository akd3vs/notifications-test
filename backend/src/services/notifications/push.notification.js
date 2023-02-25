const BaseNotification = require('./base.notification');

class PushNotification extends BaseNotification {
  async run() {
    await Promise.reject(new Error('Push service not configured or error on the provider'));
  }
}

module.exports = PushNotification;
