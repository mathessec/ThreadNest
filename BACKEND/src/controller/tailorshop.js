import tailorsModel from "../model/tailorshop.js";
import { sendEmail } from "../services/emailService.js";

const createTailor = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    // Check if a tailor with the same email already exists
    const existingTailor = await tailorsModel.findOne({ email: req.body.email });
    if (!existingTailor) {
      // Create a new tailor
      const newTailor = await tailorsModel.create(req.body);

      // Send welcome email
      if (req.body.email) {
        await sendEmail(
          req.body.email,
          "Welcome to ThreadNest",
          `Dear ${req.body.ownerName},\n\nYour tailor shop "${req.body.shopName}" has been successfully registered. We're happy to have you onboard!`
        );
      }

      res.status(201).send({
        message: "Tailor Registered Successfully",
        tailorId: newTailor.T_id,
      });
    } else {
      res.status(400).send({ message: `Tailor with ${req.body.email} already exists!` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

export const deleteTailor = async (req, res) => {
  try {
    const result = await tailorsModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Tailor not found" });
    }
    res.status(200).send({ message: "Tailor deleted successfully" });
  } catch (error) {
    console.error("Error deleting tailor:", error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


  export const editTailor = async (req, res) => {
    try {
      // Find the tailor by _id (MongoDB's built-in _id)
      const updatedTailor = await tailorsModel.findByIdAndUpdate(
        req.params.id, // _id passed in the URL
        req.body, // Request body containing the fields to update
        { new: true } // Return the updated document
      );
  
      // If no tailor is found with the given _id, return an error
      if (!updatedTailor) {
        return res.status(404).send({ message: "Tailor not found" });
      }
  
      // Send success response with the updated tailor details
      res.status(200).send({
        message: "Tailor updated successfully",
        tailor: updatedTailor,
      });
    } catch (error) {
      console.error("Error updating tailor:", error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  

  export const getTailorById = async (req, res) => {
    try {
      // Fetch tailor by MongoDB _id
      const tailor = await tailorsModel.findById(req.params.id);
  
      if (!tailor) {
        return res.status(404).send({ message: "Tailor not found" });
      }
  
      res.status(200).send({ tailor });
    } catch (error) {
      console.error("Error fetching tailor by _id:", error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  
  
  export const getAllTailors = async (req, res) => {
    try {
      const tailors = await tailorsModel.find();
  
      if (!tailors || tailors.length === 0) {
        return res.status(404).send({ message: "No tailor shops found" });
      }
  
      res.status(200).send({ tailors });
    } catch (error) {
      console.error("Error fetching tailor shops:", error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  

export default {
  createTailor,
  deleteTailor,
  editTailor,
  getTailorById,
  getAllTailors
};
