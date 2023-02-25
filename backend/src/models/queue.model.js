const BaseModel = require('./base.model');

class QueueModel extends BaseModel {
  // you can override methods in here
  async getLog(orderBy = this.orderDefaultField, order = '', limit = 100) {
    return this.query(
      `SELECT 
        q.id as queue_id,
        q.message,
        q.date,
        q.log,
        q.status,
        u.id as user_id,
        u.name as user_name,
        u.email as user_email,
        u.phone_number as user_phone_number,
        c.id as category_id,
        c.name as category_name,
        n.id as notification_id,
        n.friendly_name as notification_friendly_name,
        n.name as notification_name
      FROM ${this.tableName} AS q
      INNER JOIN user AS u ON q.user = u.id
      INNER JOIN category AS c ON q.category = c.id
      INNER JOIN notification as n ON q.notification = n.id
      ORDER BY ${orderBy} ${order}
      LIMIT ${limit}`
    );
  }
}

module.exports = new QueueModel('queue', 'user');
