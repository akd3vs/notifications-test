const BaseNotification = require('./base.notification');

class EmailNotification extends BaseNotification {
  async run() {
    // some async stuff
    await new Promise((resolve) => setTimeout(resolve, 20));

    return "email sent successfully";
  }
}

module.exports = EmailNotification;
