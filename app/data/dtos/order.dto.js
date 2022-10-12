const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const name = Joi.string().alphanum().min(3).max(15);
const status = Joi.boolean();
const total = Joi.number();
const id = Joi.string().alphanum();
const idClient = Joi.string().alphanum();
const idProduct = Joi.string().alphanum();

const createOrderDto = Joi.object({
  name: name.required(),
  total: total.required(),
  status: status.required(),
  idClient: idClient.required(),
  idProduct: idProduct.required(),
});
const updateOrderDto = Joi.object({
  name: name,
  total: total,
  status: status,
  idClient: idClient,
  idProduct: idProduct,
});

const getOrderIdDto = Joi.object({
  id: id.required(),
});

const getOrdersByClientDto = Joi.object({
  idClient: idClient.required(),
});

const getOrderByClientDto = Joi.object({
  id: id.required(),
  idClient: idClient.required(),
});

const getOrderProductDto = Joi.object({
  id: id.required(),
  idProduct: idProduct.required(),
});

module.exports = {
  createOrderDto,
  updateOrderDto,
  getOrderIdDto,
  getOrderByClientDto,
  getOrdersByClientDto,
  getOrderProductDto,
};
