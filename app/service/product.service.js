const boom = require('@hapi/boom');
const Model = require('./../data/models/product.model');

class ProductService {
  constructor() {}

  async createDB(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async findDB(data) {
    let response = {};
    let { limit, priceRange, getBrands, filter } = data;
    if (priceRange && typeof priceRange === 'string') {
      var ranges = priceRange.split(';');
      let priceMin = ranges[0];
      let priceMax = ranges[1];
      filter['price'] = { $gt: priceMin, $lt: priceMax };
    }
    let productsDB = await Model.find(filter);

    //Obtenemos de forma opcional las marcas
    if (getBrands != undefined)
      response['brands'] = getBrands
        ? productsDB.map((x) => {
            x.brand;
          })
        : [];

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

  async updateDB(id, changes) {
    let product = await Model.findOne({
      _id: id,
    });
    let productOriginal = {
      name: product.name,
      price: product.price,
    };
    const { name, price } = changes;
    product.name = name;
    product.price = price;
    product.save();

    return {
      original: productOriginal,
      actualizado: product,
    };
  }

  async deleteDB(id) {
    let product = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return product;
  }
}

module.exports = ProductService;
