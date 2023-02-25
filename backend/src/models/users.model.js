const BaseModel = require('./base.model');

class UsersModel extends BaseModel {
  // you can override methods in here
  async getSubscriptions(userId) {
    return this.query(`SELECT * FROM ${this.tableName}_subscriptions WHERE user = ?`, [userId]);
  }
  async addSubscription(userId, categoryId) {
    return this.query(
      `INSERT INTO ${this.tableName}_subscriptions SET user = ?, category = ?`,
      [userId, categoryId]
    );
  }
  async removeSubscription(userId, categoryId) {
    return this.query(
      `DELETE FROM ${this.tableName}_subscriptions WHERE user = ? AND category = ?`,
      [userId, categoryId]
    );
  }
  async getBySubscription(categoryId) {
    return this.query(
      `SELECT * FROM ${this.tableName}_subscriptions AS us
        INNER JOIN user as u ON us.user = u.id
        WHERE us.category = ?`,
      [categoryId]
    );
  }
  async getNotifications(userId) {
    return this.query( `SELECT * FROM ${this.tableName}_notifications AS un
        INNER JOIN notification as n ON un.notification = n.id
        WHERE un.user = ?`, [userId]);
  }
  async addNotification(userId, categoryId) {
    return this.query(
      `INSERT INTO ${this.tableName}_notifications SET user = ?, notification = ?`,
      [userId, categoryId]
    );
  }
  async removeNotification(userId, categoryId) {
    return this.query(
      `DELETE FROM ${this.tableName}_notifications WHERE user = ? AND notification = ?`,
      [userId, categoryId]
    );
  }
}

module.exports = new UsersModel('user');
