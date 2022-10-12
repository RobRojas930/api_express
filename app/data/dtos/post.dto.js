const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const title = Joi.string();
const description = Joi.number().integer().min(10);
const images = Joi.array();
const promos = Joi.array();

const createPostDto = Joi.object({
  title: title.required(),
  description: description.required(),
  images: images.required(),
  promos: promos.required(),
});

const updatePostDto = Joi.object({
  title: title,
  description: description,
  images: images,
  promos: promos,
});

const getPostIdDto = Joi.object({
  id: id.required(),
});
//DEFINIR
module.exports = {
  createPostDto,
  updatePostDto,
  getPostIdDto,
};
