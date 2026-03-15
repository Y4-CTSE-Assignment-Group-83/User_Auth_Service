/*
    Staff Controller
    ----------------
    These controllers handle staff profile management,
    allowing staff members to view and update their own profiles.
    The getStaffProfile controller retrieves the staff member's profile information,
    while the updateStaffProfile controller allows them to update specific fields of their profile,
    excluding sensitive information like role, email, and password.
    Both controllers ensure that only authenticated staff members can access these functionalities and provide appropriate error handling for various scenarios.
 */

import User from "../models/user.model.js";

/* ===========================
   GET STAFF PROFILE
=========================== */
export const getStaffProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({
      _id: userId,
      role: "STAFF",
    }).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Staff profile not found",
      });
    }

    res.json({
      success: true,
      profile: user,
    });
  } catch (err) {
    console.error("getStaffProfile error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching staff profile",
    });
  }
};

/* ===========================
   UPDATE STAFF PROFILE
=========================== */
export const updateStaffProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;

    // Block sensitive fields
    const blockedFields = ["role", "email", "password", "_id"];

    blockedFields.forEach((field) => delete updates[field]);

    const allowedUpdates = ["firstname", "lastname", "phone", "gender"];

    const filteredUpdates = {};

    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findOneAndUpdate(
      { _id: userId, role: "STAFF" },
      { $set: filteredUpdates },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Staff profile not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: user,
    });
  } catch (err) {
    console.error("updateStaffProfile error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};
