/*
    Staff Management Controller
    ---------------------------
    These controllers handle staff management functionalities,
    allowing administrators to create, view, update, and delete staff members.
    The createStaff controller allows admins to create new staff accounts with hashed passwords,
    while the getAllStaff and getStaffById controllers use to retrieve staff information without exposing sensitive data.
 */

import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

/* ===========================
   CREATE STAFF (ADMIN ONLY)
=========================== */
export const createStaff = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, gender } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "firstname, lastname, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const staff = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone: phone || null,
      gender: gender || null,
      role: "STAFF",
    });

    res.status(201).json({
      message: "Staff member created successfully",
      staff: {
        id: staff._id,
        firstname: staff.firstname,
        lastname: staff.lastname,
        email: staff.email,
        role: staff.role,
      },
    });
  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json({ message: "Staff creation failed" });
  }
};

/* ===========================
   GET ALL STAFF
=========================== */
export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "STAFF" }).select("-password");

    res.json(staff);
  } catch (error) {
    console.error("Get staff error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   GET STAFF BY ID
=========================== */
export const getStaffById = async (req, res) => {
  try {
    const staff = await User.findOne({
      _id: req.params.id,
      role: "STAFF",
    }).select("-password");

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.json(staff);
  } catch (error) {
    console.error("Get staff by id error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   UPDATE STAFF
=========================== */
export const updateStaff = async (req, res) => {
  try {
    const updates = req.body;

    // Prevent role change
    delete updates.role;
    delete updates.password;

    const allowedUpdates = [
      "firstname",
      "lastname",
      "phone",
      "gender",
      "isActive",
    ];

    const filteredUpdates = {};

    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const staff = await User.findOneAndUpdate(
      { _id: req.params.id, role: "STAFF" },
      filteredUpdates,
      { new: true, runValidators: true },
    ).select("-password");

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.json({
      message: "Staff member updated successfully",
      staff,
    });
  } catch (error) {
    console.error("Update staff error:", error);
    res.status(500).json({ message: "Staff update failed" });
  }
};

/* ===========================
   DELETE STAFF
=========================== */
export const deleteStaff = async (req, res) => {
  try {
    const staff = await User.findOneAndDelete({
      _id: req.params.id,
      role: "STAFF",
    });

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.json({
      message: "Staff member deleted successfully",
      deletedStaff: {
        id: staff._id,
        email: staff.email,
        name: `${staff.firstname} ${staff.lastname}`,
      },
    });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({ message: "Staff deletion failed" });
  }
};
