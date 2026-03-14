import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

/* ===========================
   CUSTOMER REGISTER
=========================== */

export const registerCustomer = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, gender } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      gender,
      role: "CUSTOMER",
    });

    generateToken(user._id, user.role, res);

    res.status(201).json({
      message: "Customer registered successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   LOGIN (ALL ROLES)
=========================== */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, user.role, res);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   LOGOUT
=========================== */

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });

  res.json({
    message: "Logged out successfully",
  });
};

/* ===========================
   GET CURRENT USER
=========================== */

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.json({ user });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
