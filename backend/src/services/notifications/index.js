const SmsNotification = require('./sms.notification');
const EmailNotification = require('./email.notification');
const PushNotification = require('./push.notification');

module.exports = {
  sms: new SmsNotification(),
  email: new EmailNotification(),
  push_notification: new PushNotification(),
}
