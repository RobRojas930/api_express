const express = require('express');
const PromoService = require('../service/promo.service');
const validatorHandler = require('./middlewares/validator.handler');
const {
  createPromoDto,
  updatePromoDto,
  getPromoDto,
} = require('../data/dtos/promo.dto');

const service = new PromoService();
const router = express.Router();

//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.get('/', async (req, res, next) => {
  const { limit, priceRange, getBrands } = req.query;
  const filter = req.body;
  try {
    const Promo = await service.findDB(
      limit || 10,
      priceRange,
      getBrands,
      filter
    );
    res.json({
      success: true,
      message: 'Estas son todas las promos',
      data: Promo,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPromoDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Promo = await service.findOneDB(id);
      res.json({
        success: true,
        message: 'Este es la Promo encontrado',
        data: Promo,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createPromoDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newPromo = await service.createDB(body);
      res.json({
        success: true,
        message: 'Promo creada correctamente',
        data: newPromo,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getPromoDto, 'params'),
  validatorHandler(updatePromoDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const { original, actualizado } = await service.updateDB(id, body);
      res.json({
        success: true,
        message: 'Promo actualizado correctamente',
        data: {
          original: original,
          acutalizado: actualizado,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const resp = await service.deleteDB(id);
    res.json({
      success: true,
      message: 'Promo eliminado correctamente',
      data: resp,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
