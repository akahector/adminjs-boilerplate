import express from 'express';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import productRoute from './product.route.js'
import categoryRoute from './category.route.js';
import subCategoryRoute from './subcategory.route.js';
import inquiryRoute from './inquiry.route.js';
import docsRoute from './docs.route.js';
import config from '../../config/config.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/products',
    route: productRoute
  },
  {
    path: '/categories',
    route: categoryRoute
  },
  {
    path: '/sub-categories',
    route: subCategoryRoute
  },
  {
    path: '/inquiries',
    route: inquiryRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
