// @todo: connect to logging services
class Log {
  info(...params) {
    console.info(...params);
  }
  log(...params) {
    console.log(...params);
  }
  debug(...params) {
    console.debug(...params);
  }
  warn(...params) {
    console.warn(...params);
  }
  error(...params) {
    console.error(...params);
  }
}

const Logger = new Log();

module.exports = Logger;
