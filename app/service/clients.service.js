// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
const Model = require('../data/subcategories.service.js/client.model');

class ClientService {
  constructor() {}

  async createDB(data) {
    const model = new Model(data);
    model.save();
    return data;
  }
}

module.exports = ClientService;
