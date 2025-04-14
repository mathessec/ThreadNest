// import express from 'express';
// const router = express.Router();
// import userController from '../controller/user.js' // Imports the controller with all methods

// // ONLY defines the /createuser route now
// router.post('/createuser',userController.createUser);

// export default router;


import express from 'express';
const router = express.Router();
import userController from '../controller/user.js';

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.post('/editUserById/:id', userController.editUserById);
router.post('/deleteUserById/:id', userController.deleteUserById);
router.post('/login', userController.login);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword); // accepts token in body

export default router;
