import express from "express";
import orderController from "../controller/order.js";
import verifyAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/create",verifyAuth,orderController.createOrder);
router.put("/edit/:orderId",verifyAuth,orderController.editOrder);
router.delete("/delete/:orderId",verifyAuth,orderController.deleteOrder);
router.get("/getbyid/:orderId",verifyAuth,orderController.getOrderById);
router.get("/getall",verifyAuth,orderController.getAllOrders);

export default router;
