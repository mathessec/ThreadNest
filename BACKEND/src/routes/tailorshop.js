import express from 'express';
import tailorshopController from '../controller/tailorshop.js';
import verifyAuth from '../middleware/auth.js';
const router = express.Router();

router.post('/create',verifyAuth,tailorshopController.createTailor);
router.get("/getbyid/:id",verifyAuth,tailorshopController.getTailorById);
router.put("/edit/:id",verifyAuth,tailorshopController.editTailor);
router.delete("/delete/:id",verifyAuth,tailorshopController.deleteTailor);
router.get("/getall",verifyAuth,tailorshopController.getAllTailors);

export default router;