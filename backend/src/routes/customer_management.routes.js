import express from "express";

import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer_management.controller.js";

import { verifyToken, requireAdmin } from "../middleware/auth.middleware.js";
import {
  customerIdValidation,
  updateCustomerValidation,
} from "../validators/customer_management.validators.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Customer Management
 *   description: Admin operations for managing customer accounts
 */

/**
 * @swagger
 * /api/customer-management/getall:
 *   get:
 *     summary: Get all customers
 *     tags: [Admin - Customer Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get(
  "/getall",
  verifyToken,
  requireAdmin,
  customerIdValidation,
  validate,
  getAllCustomers,
);

/**
 * @swagger
 * /api/customer-management/get/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Admin - Customer Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 */
router.get("/get/:id", verifyToken, requireAdmin, getCustomerById);

/**
 * @swagger
 * /api/customer-management/update/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Admin - Customer Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Customer updated successfully
 */
router.put(
  "/update/:id",
  verifyToken,
  requireAdmin,
  customerIdValidation,
  updateCustomerValidation,
  validate,
  updateCustomer,
);

/**
 * @swagger
 * /api/customer-management/delete/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Admin - Customer Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
router.delete(
  "/delete/:id",
  verifyToken,
  requireAdmin,
  customerIdValidation,
  validate,
  deleteCustomer,
);

export default router;
