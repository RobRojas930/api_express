const express = require('express');
const OrderService = require('../service/order.service');
const ProductService = require('../service/product.service');
const validatorHandler = require('../network/middlewares/validator.handler');
const {
  createOrderDto,
  updateOrderDto,
  getOrderProductDto,
  getOrderIdDto,
} = require('../data/dtos/Order.dto');

const service = new OrderService();
const productservice = new ProductService();
const router = express.Router();

//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.get('/', async (req, res, next) => {
  try {
    const data = await service.find();
    res.json({
      success: true,
      message: 'Listo',
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await service.findOne(id);
      res.json({
        success: true,
        message: 'Listo',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const data = await service.createDB(body);
      res.json({
        success: true,
        message: 'Listo',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getOrderIdDto, 'params'),
  validatorHandler(updateOrderDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await service.update(id, body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOrderIdDto, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const resp = await service.delete(id);
    res.json(resp);
  }
);

//COMPLEJO Y ESPECIFICO
router.get(
  '/:id/products/',
  validatorHandler(getOrderIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await service.findOrderProducts(id);
      let productIds = data.map((x) => x.idProduct);
      let productData = await productservice.findDB({
        _id: {
          $in: productIds,
        },
      });
      res.json({
        success: true,
        message: 'Estos son los productos encontrados',
        data: productData,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id/products/:idProduct',
  validatorHandler(getOrderProductDto, 'params'),
  async (req, res, next) => {
    try {
      const { id, idProduct } = req.params;
      const data = await service.addOrderProduct(id, idProduct);
      res.json({
        success: true,
        message: 'Se ha añadido/actualizado el producto',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
