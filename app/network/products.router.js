const express = require('express');
const ProductService = require('../service/product.service');
const service = new ProductService();
const CategoriesService = require('../service/categories.service');
const categoriesService = new CategoriesService();
const SubCategoriesService = require('../service/subcategories.service');
const subCategoriesService = new SubCategoriesService();
const validatorHandler = require('../network/middlewares/validator.handler');
const {
  createProductDto,
  updateProductDto,
  getProductIdDto,
} = require('../data/dtos/product.dto');
const checkRolHandler = require('../network/middlewares/checkRol.handler');
const authHandler = require('./middlewares/auth.handler');

const router = express.Router();

//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.get(
  '/',
  authHandler,
  checkRolHandler(['user']),
  async (req, res, next) => {
    const user = req.user;
    const { limit, priceRange, getBrands } = req.query;
    const filter = req.body;
    try {
      const products = await service.findDB(
        limit || 10,
        priceRange,
        getBrands,
        filter
      );
      res.json({
        success: true,
        message: 'Estos son todos los productos',
        data: products,
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  authHandler,
  checkRolHandler(['admin']),
  validatorHandler(getProductIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOneDB(id);
      res.json({
        success: true,
        message: 'Este es el producto encontrado',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  authHandler,
  validatorHandler(createProductDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await service.createDB(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  authHandler,
  validatorHandler(getProductIdDto, 'params'),
  validatorHandler(updateProductDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const { original, actualizado } = await service.updateDB(id, body);
      res.json({
        success: true,
        message: 'Producto actualizado correctamente',
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

router.delete(
  '/:id',
  authHandler,
  validatorHandler(getProductIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.deleteDB(id);
      res.json({
        success: true,
        message: 'Producto eliminado correctamente',
        data: resp,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id/subcategories/',
  authHandler,
  validatorHandler(getProductIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { idProduct } = req.params;
      const product = await service.findOneDB(idProduct);
      const subcategories = await subCategoriesService.findByProductId();
      res.json({
        success: true,
        message: 'Estas son las sub categorias encontradas:',
        Data: {
          product: product,
          subcategories: subcategories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id/category/',
  validatorHandler(getProductIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { idProduct } = req.params;
      const product = await service.findOneDB(idProduct);
      const category = await categoriesService.findOneD(product['idCategory']);
      res.json({
        success: true,
        message: 'Estas es la categoria del producto:',
        Data: {
          product: product,
          subcategories: category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
