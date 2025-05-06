// import express from 'express';
// const router = express.Router();
// import userController from '../controller/user.js' // Imports the controller with all methods

// // ONLY defines the /createuser route now
// router.post('/createuser',userController.createUser);

// export default router;


import express from 'express';
const router = express.Router();
import verifyAuth from "../middleware/auth.js";
import userController from '../controller/user.js';

router.get('/getAllUsers',verifyAuth,userController.getAllUsers);
router.get('/getUserById/:id',verifyAuth,userController.getUserById);
router.post('/createUser',userController.createUser);
router.post('/editUserById/:id',verifyAuth,userController.editUserById);
router.post('/deleteUserById/:id',verifyAuth,userController.deleteUserById);
router.post('/login',userController.login);
router.post('/forgotPassword',verifyAuth,userController.forgotPassword);
router.post('/resetPassword',verifyAuth,userController.resetPassword); // accepts token in body

export default router;
