const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const brand = Joi.string();
const listOfCategories = Joi.array();

const createProductDto = Joi.object({
  name: name.required(),
  price: price.required(),
  categories: listOfCategories.required(),
  brand: brand.required()
});

const updateProductDto = Joi.object({
  name: name,
  price: price,
  categories: listOfCategories,
  brand: brand
});

const getProductIdDto = Joi.object({
  id: id.required(),
});

const getProductCategoriesId = Joi.object({
  idProduct: id.required(),
});


module.exports = { createProductDto, updateProductDto, getProductIdDto, getProductCategoriesId };
