/*
    Customer Management Controller
    -------------------------------
    These controllers allow administrators to manage customer accounts.
    Admin can view all customers, view a specific customer,
    update customer details, or delete a customer account.
*/

import User from "../models/user.model.js";

/* ===========================
   GET ALL CUSTOMERS
=========================== */
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "CUSTOMER" }).select("-password");

    res.json(customers);
  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   GET CUSTOMER BY ID
=========================== */
export const getCustomerById = async (req, res) => {
  try {
    const customer = await User.findOne({
      _id: req.params.id,
      role: "CUSTOMER",
    }).select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    console.error("Get customer by id error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   UPDATE CUSTOMER
=========================== */
export const updateCustomer = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Prevent sensitive updates
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

    const customer = await User.findOneAndUpdate(
      { _id: req.params.id, role: "CUSTOMER" },
      filteredUpdates,
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    console.error("Update customer error:", error);
    res.status(500).json({ message: "Customer update failed" });
  }
};

/* ===========================
   DELETE CUSTOMER
=========================== */
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findOneAndDelete({
      _id: req.params.id,
      role: "CUSTOMER",
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json({
      message: "Customer deleted successfully",
      deletedCustomer: {
        id: customer._id,
        email: customer.email,
        name: `${customer.firstname} ${customer.lastname}`,
      },
    });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({ message: "Customer deletion failed" });
  }
};
