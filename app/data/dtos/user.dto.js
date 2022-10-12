const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const name = Joi.string();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const password = joiPassword
  .string()
  .minOfSpecialCharacters(2)
  .minOfLowercase(2)
  .minOfUppercase(2)
  .minOfNumeric(2)
  .noWhiteSpaces();

const loginDto = Joi.object({
  email: email.required(),
  password: password.required(),
});
const registerDto = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

module.exports = { loginDto, registerDto};
