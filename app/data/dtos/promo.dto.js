const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const title = Joi.string().min(5).max(15);
const description = Joi.string().min(5).max(15);
const dateStart = Joi.date();
const dateEnd = Joi.date();
const coupon = Joi.string().min(4).max(6);
const isActive = Joi.boolean();

const createPromoDto = Joi.object({
  title: title.required(),
  description: description.required(),
  dateStart: dateStart.required(),
  dateEnd: dateEnd.required(),
  coupon: coupon.required(),
  isActive: isActive.required(),
});

const updatePromoDto = Joi.object({
  title: title,
  description: description,
  dateStart: dateStart,
  dateEnd: dateEnd,
  coupon: coupon,
  isActive: isActive,
});

const getPromoIdDto = Joi.object({
  id: id.required(),
});

module.exports = { createPromoDto, updatePromoDto, getPromoIdDto };
