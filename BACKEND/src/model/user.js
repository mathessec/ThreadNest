import mongoose from "./index.js"; // Assuming this imports your mongoose connection setup
import validators from "../utils/validator.js";
import { generateUUID } from "../utils/helper.js";

const UserSchema = new mongoose.Schema(
  {
    // Defines fields like name, id, email, password, role, etc.
    name: { type: String, required: true },
    id: {
      type: String,
      default: function () {
        return generateUUID(); // Uses a helper function for default value
      },
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: { // Includes validation
        validator: validators.validateEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    profilepic: { type: String },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "tailor", "admin"], // Enumerated values for role
      default: "user",
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
      validate: { // Includes validation
        validator: validators.validateMobile,
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    address: { type: String, required: true },
    resetPasswordToken: { type: String, default: undefined },
    resetPasswordExpire: { type: Date, default: undefined },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Creates and exports the Mongoose model named 'users' based on the schema
export default mongoose.model("users", UserSchema);