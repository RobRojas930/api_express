const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const name = Joi.string();
const filename = Joi.string();
const path = Joi.date();

const createStorageDto = Joi.object({
  name: name.required(),
  filename: filename.required(),
  path: path.required(),
});

const updateStorageDto = Joi.object({
  name:name,
  filename:filename,
  path:path,
});

const getStorageIdDto = Joi.object({
  id: id.required(),
});

module.exports = { createStorageDto, updateStorageDto, getStorageIdDto };
