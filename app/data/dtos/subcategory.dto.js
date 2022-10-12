const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const name = Joi.string().min(3).max(15);

const createSubCategoryDto = Joi.object({
  name: name.required(),
});
const updateSubCategoryDto = Joi.object({
  name: name,
});

const getSubCategoryIdDto = Joi.object({
  id: id.required(),
});

module.exports = {
  createSubCategoryDto,
  updateSubCategoryDto,
  getSubCategoryIdDto,
};
