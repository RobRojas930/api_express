const express = require('express');
const ClientService = require('../service/client.service');
const validatorHandler = require('../network/middlewares/validator.handler');
const { createClientDto, updateClientDto, getClientDto } = require('../data/dtos/client.dto');

const service = new ClientService();
const router = express.Router();

//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.get('/', async (req, res, next) => {
  try {
    const data = await service.find();
    res.json({
      success: true,
      message: 'Listo',
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(createClientDto, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await service.findOne(id);
    res.json({
      success: true,
      message: 'Listo',
      data: data
    });
  } catch (error) {
    next(error);
  }

});

router.post('/', validatorHandler(getClientDto, 'body'), async (req, res, next) => {
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
  validatorHandler(getClientDto, 'params'),
  validatorHandler(updateClientDto, 'body'),
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
