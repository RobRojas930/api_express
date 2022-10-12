const faker = require("faker");
const boom = require("@hapi/boom");
const Model = require('../data/models/client.model');

const { validateData, NOTFOUND, CONFLICT } = require("../utils/utils");


class ClientService {
  constructor() {
    this.clients = [];
    this.generate();
  }


  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.clients.push({
        isActive: true,
        id: faker.random.uuid(),
        name: faker.commerce.ClientName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async createDB(data) {
    const model = new Model(data);
    model.save();
    return data;
  }

  async create(data) {
    const newClient = {
      id: faker.random.uuid(),
      ...data
    }
    this.clients.push(newClient);
    return newClient;
  }

  //AQUÍ YA NO SE REQUIERE ASYNC POR QUE EL PROMISE LO RESUELVE INTERNAMENTE
  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeClients = this.clients.filter(x => x.isActive === true);
        resolve(activeClients);
      }, 2000);
    });
  }

  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const Client = this.clients.find(item => item.id === id);
    //NOT FOUND
    validateData(Client, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(Client, CONFLICT, 'CONFLICTO, el Cliente esta bloqueado.', (data) => data.isActive == false);
    return Client;
  }

  async update(id, changes) {

    const index = this.clients.findIndex(item => item.id === id);
    if (index === -1)
      throw boom.notFound('Cliente no encontrado');//Forma con boom
    //throw new Error('Client not found'); Forma tradicional

    var currentClient = this.clients[index];
    this.clients[index] = {
      ...currentClient,
      ...changes
    };
    return this.clients[index];
  }

  async delete(id) {
    const index = this.clients.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Cliente no encontrado')
    }
    this.clients.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    }
  }

}

module.exports = ClientService;
