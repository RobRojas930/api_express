const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const name = Joi.string().alphanum().min(3).max(15);
const lastname = Joi.string().alphanum().min(3).max(15);

const createClientDto = Joi.object({
  name: name.required(),
  lastname: lastname.required()
});
const updateClientDto = Joi.object({
  name: name,
  lastname: lastname
});

const getClientIdDto = Joi.object({
  name: name.required(),
  id: id.required(),
});


module.exports = { createClientDto, updateClientDto, getClientIdDto };
