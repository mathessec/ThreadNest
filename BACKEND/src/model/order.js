import mongoose from "./index.js";
import { generateUUID } from "../utils/helper.js";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: () => generateUUID(),
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    tailorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tailors",
      required: true,
    },

    garments: [
      {
        gender: { type: String, enum: ["men", "women"], required: true },
        garmentType: { type: String, required: true }, // e.g., "Shirt", "Kurti/Dress"
        alterationType: { type: String, required: true }, // e.g., "Sleeve Shortening"
        price: { type: Number, required: true },
      },
    ],

    pickupLocation: {
      address: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    deliveryCharge: { type: Number, required: true },
    totalAmount: { type: Number, required: true }, // Sum of services + delivery charge

    verificationOTP: { type: String, required: true }, // For delivery return confirmation

    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Picked Up",
        "In Progress",
        "Ready",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", OrderSchema);
