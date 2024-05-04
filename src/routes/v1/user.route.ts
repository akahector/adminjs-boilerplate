import express from 'express';
import userController from '../../controller/user.controller.js';
// import auth from '../../middlewares/auth';
// import validate from '../../middlewares/validate';
// import { userValidation } from '../../validations';
// import { userController } from '../../controllers';

const router = express.Router();

router
  .route('/')
//   .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
//   .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);
// .get(userController.getUsers)



export default router;
