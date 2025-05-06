import Order from "../model/order.js"; // Importing Order model
import Tailor from "../model/tailorshop.js"; // Importing Tailor model
import { sendEmail } from "../services/emailService.js"; // Importing email service
import { generateUUID } from "../utils/helper.js"; // Helper to generate UUID for orderId

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("userId", "name email") // include user name & email
        .populate("tailorId", "shopName contactNumber"); // include tailor shopName & contactNumber
  
      res.status(200).json({
        success: true,
        message: "All orders fetched successfully",
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching orders",
        error: error.message,
      });
    }
  };

// Create a new order
export const createOrder = async (req, res) => {
    try {
      const {
        userId,
        tailorId,
        garments,
        pickupLocation,
        deliveryCharge,
        totalAmount,
        verificationOTP,
        orderStatus,
        paymentStatus,
      } = req.body;
  
      // Create a new order object
      const newOrder = new Order({
        userId,
        tailorId,
        garments,
        pickupLocation,
        deliveryCharge,
        totalAmount,
        verificationOTP,
        orderStatus,
        paymentStatus,
      });
  
      // Save order to the database
      const savedOrder = await newOrder.save();
  
      // Optionally, send email to the user (if needed)
      sendEmail(
        req.body.userEmail,
        "Order Confirmation - FitPro Tailoring",
        `Your order ${savedOrder.orderId} has been placed successfully.`
      );
  
      res.status(201).json({
        success: true,
        message: "Order created successfully!",
        order: savedOrder,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create order.",
        error: error.message,
      });
    }
  };

export const editOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Order _id is required in the URL.",
        });
      }
  
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found with this _id.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Order updated successfully.",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Edit Order Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update the order.",
        error: error.message,
      });
    }
  };
  
  
  // Delete an order
export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Order deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete order.",
        error: error.message,
      });
    }
};
  
  
  // Get order by orderId
export const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch order.",
        error: error.message,
      });
    }
  };
  

export default {
    getAllOrders,
    createOrder,
    editOrder,
    deleteOrder,
    getOrderById
  };
