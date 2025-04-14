import usersModel from "../model/user.js";
import auth from "../utils/auth.js";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";


const getAllUsers = async (req, res) => {
    try {
      //to get the headers from the req where it also contain the authorization(bearer token option) in header
  
      //then we estatblish the connection
      //then choosing the specific database,what collection of database
      //then we finally right query
      //accessing the user collections document
      let users = await usersModel.find({}, { _id: 0 }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
      res.status(200).send({
        message: "Data fetched Successfully",
        data: users,
      });
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error.message);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  };

const getUserById = async (req, res) => {
    try {
      //then we estatblish the connection
      //then choosing the specific database,what collection of database
      //then we finally right query
      let { id } = req.params;
      let user = await usersModel.findOne({ id: id }, { _id: 0 }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
      res.status(200).send({
        message: "Data fetched Successfully",
        data: user,
      });
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error.message);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  };

const editUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersModel.findOne({ id: id });
  
      if (!user) {
        return res.status(400).send({ message: "Invalid Id" });
      }
  
      const { name, email, mobile, role, profilepic, address } = req.body;
  
      if (name) user.name = name;
      if (email) user.email = email;
      if (mobile) user.mobile = mobile;
      if (role) user.role = role;
      if (profilepic) user.profilepic = profilepic;
      if (address) user.address = address;
  
      await user.save(); // will trigger validators in schema
      res.status(200).send({ message: "User Edited Successfully" });
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error.message);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
};

const deleteUserById = async (req, res) => {
    try {
      //then we estatblish the connection
      //then choosing the specific database,what collection of database
      //then we finally right query//accessing the user collections document
      let { id } = req.params;
      let data = await usersModel.deleteOne({ id: id }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
      if (data.deletedCount) {
        res.status(200).send({ message: "User Deleted Successfully" });
      } else {
        res.status(400).send({ message: "Invalid Id" });
      }
    } catch (error) {
      console.log(`Error in ${req.originalUrl}`, error.message);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  };

const createUser = async (req, res) => {
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      // Hash the password
      req.body.password = await auth.hashData(req.body.password);

      // Create the user and store the result in a variable to access the ID
      const newUser = await usersModel.create(req.body);

      // Send welcome email
      await sendEmail(
        req.body.email,
        "Welcome to ThreadNest",
        "Thank you for choosing StitchEase! We're excited to help you with your tailoring needs. Your style, your fit – made perfect."
      );

      // Respond with success message and new user's ID
      res.status(201).send({
        message: "User Created Successfully",
        userId: newUser.id, // Include userId in the response
      });
    } else {
      res
        .status(400)
        .send({ message: `User with ${req.body.email} already exists!` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await usersModel.findOne({ email: email });
    if (user) {
      //compare password
      if (await auth.compareHash(user.password, password)) {
        //create token
        const token = auth.createToken({
          email: user.email,
          name: user.name,
          id: user.id,
        });

        res.status(200).send({
          message: "Login Successfull",
          token,
          id: user.id,
        });
      } else {
        res.status(400).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        message: `User with email ${req.body.email} does not exists`,
      });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set the token and expiry on the user document (store in database)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Create reset URL
    const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;

    // Send email with the reset link
    await sendEmail(
      user.email,
      "Password Reset Request",
      `To reset your password, click the link below:\n\n${resetUrl}`
    );

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller to reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user with the reset token and check if it has expired
    const user = await usersModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password before saving
    user.password = await auth.hashData(newPassword);
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpire = undefined; // Clear the expiry
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  editUserById,
  deleteUserById,
  login,
  forgotPassword,
  resetPassword,
};