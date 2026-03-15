/*
    Customer Controller
    -------------------
    These controllers handle customer profile management,
    allowing customers to view and update their own profiles.

    - getCustomerProfile:
      Retrieves the authenticated customer's profile.

    - updateCustomerProfile:
      Allows the customer to update allowed profile fields
      such as firstname, lastname, phone, and gender.

    Sensitive fields like role, email, password, and _id
    cannot be updated through this endpoint.
*/

import User from "../models/user.model.js";

/* ===========================
   GET CUSTOMER PROFILE
=========================== */
export const getCustomerProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({
      _id: userId,
      role: "CUSTOMER",
    }).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Customer profile not found",
      });
    }

    res.json({
      success: true,
      profile: user,
    });
  } catch (err) {
    console.error("getCustomerProfile error:", err);

    res.status(500).json({
      success: false,
      message: "Server error while fetching customer profile",
    });
  }
};

/* ===========================
   UPDATE CUSTOMER PROFILE
=========================== */
export const updateCustomerProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;

    /* Block sensitive fields */
    const blockedFields = ["role", "email", "password", "_id"];

    blockedFields.forEach((field) => delete updates[field]);

    /* Allowed fields */
    const allowedUpdates = ["firstname", "lastname", "phone", "gender"];

    const filteredUpdates = {};

    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findOneAndUpdate(
      { _id: userId, role: "CUSTOMER" },
      { $set: filteredUpdates },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Customer profile not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: user,
    });
  } catch (err) {
    console.error("updateCustomerProfile error:", err);

    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};
