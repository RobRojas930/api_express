const faker = require('faker');
const boom = require('@hapi/boom');
const Model = require('../data/models/product.model');

const { validateData, NOTFOUND, CONFLICT } = require('../utils/utils');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        isActive: true,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

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

  //FAKER
  async create(data) {
    const newProduct = {
      id: faker.random.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  //AQUÍ YA NO SE REQUIERE ASYNC POR QUE EL PROMISE LO RESUELVE INTERNAMENTE
  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeProducts = this.products.filter((x) => x.isActive === true);
        resolve(activeProducts);
      }, 2000);
    });
  }

  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const product = this.products.find((item) => item.id === id);
    //NOT FOUND
    validateData(product, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(
      product,
      CONFLICT,
      'CONFLICTO, el producto esta bloqueado.',
      (data) => data.isActive == false
    );
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('Producto no encontrado'); //Forma con boom
    //throw new Error('Product not found'); Forma tradicional

    var currentProduct = this.products[index];
    this.products[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = ProductService;
