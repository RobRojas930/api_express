const express = require('express');
const PostService = require('../service/post.service');
const validatorHandler = require('./middlewares/validator.handler');
const {
  createPostDto,
  updatePostDto,
  getPostDto,
} = require('../data/dtos/post.dto');

const service = new PostService();
const router = express.Router();

//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.get('/', async (req, res, next) => {
  const { limit, priceRange, getBrands } = req.query;
  const filter = req.body;
  try {
    const Post = await service.findDB(
      limit || 10,
      priceRange,
      getBrands,
      filter
    );
    res.json({
      success: true,
      message: 'Estos son todos los recursos multimedia',
      data: Post,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPostDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Post = await service.findOneDB(id);
      res.json({
        success: true,
        message: 'Este es el post encontrado',
        data: Post,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createPostDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newPost = await service.createDB(body);
      res.json({
        success: true,
        message: 'post creado correctamente',
        data: newPost,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getPostDto, 'params'),
  validatorHandler(updatePostDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const { original, actualizado } = await service.updateDB(id, body);
      res.json({
        success: true,
        message: 'post actualizado correctamente',
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
      message: 'post eliminado correctamente',
      data: resp,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
