import express from "express";

import { verifyToken, requireCustomer } from "../middleware/auth.middleware.js";

import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../controllers/customer.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateCustomerProfileValidation } from "../validators/customer.validators.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customer Profile
 *   description: Customer self profile management
 */

/**
 * @swagger
 * /api/customer/profile:
 *   get:
 *     summary: Get customer profile
 *     tags: [Customer Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer profile retrieved successfully
 */
router.get("/profile", verifyToken, requireCustomer, getCustomerProfile);

/**
 * @swagger
 * /api/customer/profile:
 *   put:
 *     summary: Update customer profile
 *     tags: [Customer Profile]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put(
  "/profile",
  verifyToken,
  requireCustomer,
  updateCustomerProfileValidation,
  validate,
  updateCustomerProfile,
);

export default router;
