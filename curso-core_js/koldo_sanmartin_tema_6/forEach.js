function forEach(items, callback) {
    for (const item of items) {
      callback(item);
    }
  }
  module.exports = forEach;