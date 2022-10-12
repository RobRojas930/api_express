const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const idCategory = Joi.string().alphanum();
const idProduct = Joi.string().alphanum();
const name = Joi.string().alphanum().min(3).max(15);

const createCategoryDto = Joi.object({
  name: name.required(),
});
const updateCategoryDto = Joi.object({
  name: name,
});

const getCategoryIdDto = Joi.object({
  idCategory: idCategory.required(),
});

const getCategoryByIdProductDto = Joi.object({
  idProduct: idProduct.required(),
  idCategory: idCategory.required(),
});


module.exports = { createCategoryDto, updateCategoryDto, getCategoryIdDto, getCategoryByIdProductDto };
