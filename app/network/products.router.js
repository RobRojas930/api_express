const express = require('express');
const ProductService = require('../service/product.service');
const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../network/middlewares/validator.handler');
const {
  createProductDto,
  updateProductDto,
  getProductDto,
  getProductCategoriesId,
} = require('../data/dtos/product.dto');

const service = new ProductService();
const categoriesService = new CategoriesService();
const router = express.Router();

//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.get('/', async (req, res, next) => {
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
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getProductDto, 'params'),
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
  validatorHandler(getProductDto, 'params'),
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

router.delete('/:id', async (req, res, next) => {
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
});

//RUTAS COMPLEJAS /:id/photos/
//RUTAS COMPLEJAS ESPECIFICAS /:id/photos/:id
router.get(
  '/:idProduct/categories/',
  validatorHandler(getProductCategoriesId, 'params'),
  async (req, res, next) => {
    try {
      const { idProduct } = req.params;
      const product = await service.findOneDB(idProduct);
      const { categories } = product;
      const listOfCategories = await categoriesService.findDB(0, {
        _id: { $in: categories },
      });
      res.json({
        success: true,
        message: 'Estas son las categorias encontradas:',
        Data: {
          producto: product,
          categorias: listOfCategories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
