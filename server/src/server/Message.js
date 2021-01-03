class Message {
  constructor(status = 0, message = "", data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

function message(status = 0, msg = "", data = null) {
  return JSON.stringify(new Message(status, msg, data));
}

module.exports = message;
