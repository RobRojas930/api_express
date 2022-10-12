
const boom = require("@hapi/boom");

const NOTFOUND = 'notfound';
const CONFLICT = 'conflict';

const validateData = (data, type, message, condition) => {
  if (condition(data)) {
    switch (type) {
      case NOTFOUND:
        throw boom.notFound(message);
      case CONFLICT:
        throw boom.conflict(message);
      default:
        break;
    }
  }
}

module.exports = { validateData, NOTFOUND, CONFLICT };
