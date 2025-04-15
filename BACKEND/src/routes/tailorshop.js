import express from 'express';
import tailorshopController from '../controller/tailorshop.js';
const router = express.Router();

router.post('/create', tailorshopController.createTailor);
router.get("/getbyid/:id", tailorshopController.getTailorById);
router.put("/edit/:id", tailorshopController.editTailor);
router.delete("/delete/:id", tailorshopController.deleteTailor);
router.get("/getall", tailorshopController.getAllTailors);

export default router;