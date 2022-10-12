/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const Model = require('../data/models/product.model');

const { validateData, NOTFOUND, CONFLICT } = require('../utils/utils');

class ProductMediaService {
  constructor() {}

  async createDB(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async findDB(data) {
    let response = {};
    let { limit, filter } = data;
    let productsDB = await Model.find(filter);
    //Obtenemos solo la cantidad deseada de registros
    response['products'] = limit
      ? productsDB.filter((item, index) => item && index < limit)
      : productsDB;

    return response;
  }
  async findOneDB(id) {
    const product = await Model.findOne({
      _id: id,
    });
    if (product == undefined || product == null)
      throw boom.notFound('No se encontro catalogo');
    else if (product.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return product;
  }

  // eslint-disable-next-line no-unused-vars
  async updateDB(id, changes) {
    let productMedia = await Model.findOne({
      _id: id,
    });
    let productMediaOriginal = {
      //DEFINIR
    };
    //const { name, price } = changes;
    //product.name = name;
    //product.price = price;
    //DEFINIR
    productMedia.save();

    return {
      original: productMediaOriginal,
      actualizado: {
        /*DEFINIR*/
      },
    };
  }

  async deleteDB(id) {
    let productMedia = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return productMedia;
  }
}

module.exports = ProductMediaService;
