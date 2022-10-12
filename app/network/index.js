const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const storageRouter = require('./storage.router');
const postRouter = require('./post.router');
const promoRouter = require('./promo.router');
const userRouter = require('./user.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/storage', storageRouter);
  router.use('/post', postRouter);
  router.use('/promo', promoRouter);
  router.use('/user', userRouter);
}

module.exports = routerApi;
