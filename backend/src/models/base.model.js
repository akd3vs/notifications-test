const mysql = require('mysql2/promise');

const config = {
  host: 'db',
  // host: '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_USER_PSWD,
  database: process.env.MYSQL_DB,
  namedPlaceholders: true,
};

class BaseModel {
  tableName = '_null_';
  orderDefaultField = null
  connection = null;

  constructor(tableName, orderDefaultField = 'name') {
    this.tableName = tableName;
    this.orderDefaultField = orderDefaultField;

    this.connect();
  }
  async connect() {
    mysql.createConnection(config).then((connection) => {
      this.connection = connection;
    }).catch((e) => {
      setTimeout(() => this.connect(), 120);
    });
  }
  async query(queryString, params, options) {
    const [results,] = await this.connection.query({ sql: queryString, values: params, ...options });

    return results;
  }
  async get(limit = 100) {
    return this.query(`SELECT * FROM ${this.tableName} ORDER BY ${this.orderDefaultField} LIMIT ${limit}`);
  }
  async getById(id) {
    return this.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
  }

  /**
   *
   * @param object Object must be like {"name": "test", ...}
   * @returns {Promise<*>}
   */
  async insert(object) {
    const fields = Object.keys(object).join(' = ?, ') + ' = ?';
    const values = Object.values(object);

    return this.query(`INSERT INTO ${this.tableName} SET ${fields}`, values);
  }

  async update(id, object) {
    const fields = Object.keys(object).join(' = ?, ') + ' = ?';
    const values = Object.values(object);
    values.push(id);

    return this.query(`UPDATE ${this.tableName} SET ${fields} WHERE id = ?`, values);
  }

  async remove(id) {
    return this.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}

module.exports = BaseModel;
