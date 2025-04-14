import mongoose from "./index.js";
import validators from "../utils/validators.js";
import { generateUUID } from "../utils/helper.js";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: {
      type: String,
      default: function () {
        return generateUUID();
      },
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
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
      enum: ["user", "tailor", "admin"],
      default: "user",
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
      validate: {
        validator: validators.validateMobile,
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    address: { type: String, required: true },
    resetPasswordToken: { type: String, default: undefined },
    resetPasswordExpire: { type: Date, default: undefined },
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);