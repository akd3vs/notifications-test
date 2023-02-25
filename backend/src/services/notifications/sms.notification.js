const BaseNotification = require('./base.notification');

class SmsNotification extends BaseNotification {
  async run() {
    // some async stuff
    await new Promise((resolve) => setTimeout(resolve, 120));

    return "sms sent successfully";
  }
}

module.exports = SmsNotification;
