import mongoose from "./index.js";
import { generateUUID } from "../utils/helper.js";

const TailorSchema = new mongoose.Schema(
  {
    T_id: {
      type: String,
      default: () => generateUUID(),
      unique: true,
    },
    shopName: {
      type: String,
      required: [true, "Shop name is required"],
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Shop address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    services: {
      type: Object,
      default: {
        men: {
          Shirt: [
            { name: "Sleeve Shortening", price: 100 },
            { name: "Side Tapering (Slim Fit)", price: 120 },
            { name: "Collar/Cuff Repair", price: 80 },
            { name: "General Fitting", price: 100 },
          ],
          Trouser: [
            { name: "Waist In/Out", price: 150 },
            { name: "Length Adjustment", price: 100 },
            { name: "Zip/Button Replacement", price: 60 },
            { name: "General Fitting", price: 120 },
          ],
          Kurta: [
            { name: "Length Adjustment", price: 110 },
            { name: "Waist Fit Adjustment", price: 130 },
            { name: "Neckline Repair", price: 100 },
            { name: "General Fitting", price: 100 },
          ],
          "Blazer/Suit": [
            { name: "Shoulder Alteration", price: 250 },
            { name: "Sleeve or Length Adjustment", price: 200 },
            { name: "General Fitting", price: 150 },
          ],
        },
        women: {
          Blouse: [
            { name: "Bust Fitting", price: 120 },
            { name: "Sleeve Styling/Shortening", price: 100 },
            { name: "Neckline Adjustment", price: 110 },
            { name: "General Fitting", price: 100 },
          ],
          "Kurti/Dress": [
            { name: "Waist or Hip Alteration", price: 130 },
            { name: "Side Slit Alteration", price: 90 },
            { name: "Length Adjustment", price: 100 },
            { name: "General Fitting", price: 110 },
          ],
          "Salwar/Pant": [
            { name: "Waist Fit Adjustment", price: 110 },
            { name: "Length Correction", price: 90 },
            { name: "Zip/Button Repair", price: 50 },
            { name: "General Fitting", price: 100 },
          ],
          "Lehenga/Gown": [
            { name: "Tight/Loose Fit Correction", price: 200 },
            { name: "Hook/Zip Repair", price: 60 },
            { name: "Sleeve/Neck Adjustment", price: 130 },
            { name: "General Fitting", price: 150 },
          ],
          Saree: [
            { name: "Fall/Pico Service", price: 70 },
            { name: "Hook/Edge Fix", price: 50 },
          ],
        },
      },
    },
    shopDescription: {
      type: String,
      default: "Welcome to our tailor shop! We specialize in custom tailoring and alterations for all types of clothing. Our skilled tailors are dedicated to providing you with the perfect fit and style.",
    },
    shopPhotos: {
      type: [String], // Array of image URLs or file names
      default: [],
    },
    openingHours: {
      type: String, // e.g., "10:00 AM - 8:00 PM"
    },
    workingDays: {
      type: [String], // e.g., ["Monday", "Tuesday", ...]
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    closedOn: {
      type: [String], // Optional: ["Sunday"]
      default: [],
    },
    offersPickupDelivery: {
      type: Boolean,
      default: false,
    },
    deliveryCharges: {
      type: Number, // Optional extra charge
    },
    ratings: {
      type: Number, // Average rating, e.g., 4.5
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("tailors", TailorSchema);
