const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string();
const brand = Joi.string();
const idCategory = Joi.string();
const subCategories = Joi.array();
const count = Joi.number().integer().min(0);

const createProductDto = Joi.object({
  name: name.required(),
  image: image.required(),
  price: price.required(),
  categories: subCategories.required(),
  idCategory: idCategory.required(),
  subCategories: subCategories.required(),
  count: count.required(),
});

const updateProductDto = Joi.object({
  name: name,
  image: image,
  price: price,
  categories: subCategories,
  brand: brand,
  idCategory: idCategory,
  subCategories: subCategories,
  count: count,
});

const getProductIdDto = Joi.object({
  id: id.required(),
});

module.exports = { createProductDto, updateProductDto, getProductIdDto };
