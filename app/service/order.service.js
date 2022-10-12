const boom = require('@hapi/boom');
const Model = require('../data/subcategories.service.js/order.model');
const productsModel = require('../data/subcategories.service.js/containedProducts.model');

class OrderService {
  constructor() {}

  async createDB(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async findDB(data) {
    let { limit, filter } = data;
    let ordersDB = await Model.find(filter);
    let orders = limit
      ? ordersDB.filter((item, index) => item && index < limit)
      : ordersDB;

    return orders;
  }

  async findOneDB(id) {
    const order = await Model.findOne({
      _id: id,
    });
    if (order == undefined || order == null)
      throw boom.notFound('No se encontro catalogo');
    else if (order.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return order;
  }

  async updateDB(id, changes) {
    let order = await Model.findOne({
      _id: id,
    });
    let orderOriginal = {
      name: order.name,
      price: order.price,
    };
    const { name, price } = changes;
    order.name = name;
    order.price = price;
    order.save();

    return {
      original: orderOriginal,
      actualizado: order,
    };
  }

  async deleteDB(id) {
    let order = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return order;
  }

  async findOrderProducts(id) {
    let orderProducts = await Model.findOne(
      {
        _id: id,
      },
      'products'
    );
    if (!orderProducts) throw boom.notFound('No se encontro data');
    return orderProducts;
  }
  async addOrderProduct(idOrder, product) {
    //BUSCAMOS NUESTRO PEDIDO
    if (!product) throw boom.badData('No se ha recibido el producto');

    let order = await Model.findOne({
      _id: idOrder,
    });
    if (!order) throw boom.notFound('No se ha encontrado el pedido');

    //BUSCAMOS EL PRODUCTO QUE DESEAMOS AÑADIR O ACTUALIZAR
    let productFound = {};
    productFound = order['products'].find(
      (x) => (x['idProduct'] = product['id'])
    );

    let dataToAdd = {};
    //SI SE ENCUENTRA YA SE ACTUALIZA AUMENTANDO LA CANTIDAD Y EL TOTAL
    if (productFound && typeof productFound == 'object') {
      //ACTUALIZAMOS
      dataToAdd = {
        count: productFound['count'] + 1,
        total: productFound['total'] + product['price'],
      };

      productFound = {
        ...productFound,
        ...dataToAdd,
      };
      var indexProduct = order['products'].indexOf(productFound);
      if (indexProduct == -1)
        throw boom.notFound('No se encontro el producto a actualizar');
      order['products'][indexProduct] = productFound;
    } else {
      //SI NO AÑADIMOS
      dataToAdd = {
        idProduct: product['id'],
        count: 1,
        price: product['price'],
        total: product['price'],
      };
      const newProductToAdd = new productsModel(dataToAdd);
      await newProductToAdd.save();
      order['products'].push(newProductToAdd);
    }
    await order.save();
  }
}

module.exports = OrderService;
