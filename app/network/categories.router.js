const express = require('express');
const CategoryService = require('../service/categories.service');
const validatorHandler = require('./middlewares/validator.handler');
const { createCategoryDto, updateCategoryDto, getCategoryDto } = require('../data/dtos/Category.dto');

const service = new CategoryService();
const router = express.Router();

//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.get('/', async (req, res, next) => {
  try {
    const { limit } = req.query;
    const filter = req.body;
    const data = await service.findDB(limit, filter);
    res.json({
      success: true,
      message: 'Listo',
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(createCategoryDto, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await service.findOneDB(id);
    res.json({
      success: true,
      message: 'Listo',
      data: data
    });
  } catch (error) {
    next(error);
  }

});

router.post('/', validatorHandler(getCategoryDto, 'body'), async (req, res, next) => {
  const body = req.body;
  try {
    const data = await service.createDB(body);
    res.json({
      success: true,
      message: 'Listo',
      data: data
    });
  } catch (error) {
    next(error);
  }

});

router.patch('/:id',
  validatorHandler(getCategoryDto, 'params'),
  validatorHandler(updateCategoryDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await service.update(id, body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const resp = await service.delete(id);
  res.json(resp);
});



module.exports = router;
