import express from "express";

import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from "../controllers/staff_management.controller.js";

import { verifyToken, requireAdmin } from "../middleware/auth.middleware.js";
import {
  createStaffValidation,
  staffIdValidation,
  updateStaffValidation,
} from "../validators/staff_management.validators.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

/* ===========================
   STAFF MANAGEMENT ROUTES
=========================== */

/**
 * @swagger
 * tags:
 *   name: Admin - Staff Management
 *   description: Admin operations for managing staff accounts
 */

/**
 * @swagger
 * /api/staff-management/create:
 *   post:
 *     summary: Create a new staff member
 *     tags: [Admin - Staff Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Staff created successfully
 */
router.post(
  "/create",
  verifyToken,
  requireAdmin,
  createStaffValidation,
  validate,
  createStaff,
);

/**
 * @swagger
 * /api/staff-management/getall:
 *   get:
 *     summary: Get all staff members
 *     tags: [Admin - Staff Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff members
 */
router.get("/getall", verifyToken, requireAdmin, getAllStaff);

/**
 * @swagger
 * /api/staff-management/get/{id}:
 *   get:
 *     summary: Get staff member by ID
 *     tags: [Admin - Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff details
 *       404:
 *         description: Staff not found
 */
router.get(
  "/get/:id",
  verifyToken,
  requireAdmin,
  staffIdValidation,
  validate,
  getStaffById,
);

/**
 * @swagger
 * /api/staff-management/update/{id}:
 *   put:
 *     summary: Update staff member details
 *     tags: [Admin - Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ID
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
 *         description: Staff Member updated successfully
 */
router.put(
  "/update/:id",
  verifyToken,
  requireAdmin,
  staffIdValidation,
  updateStaffValidation,
  validate,
  updateStaff,
);

/**
 * @swagger
 * /api/staff-management/delete/{id}:
 *   delete:
 *     summary: Delete staff member
 *     tags: [Admin - Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 */
router.delete(
  "/delete/:id",
  verifyToken,
  requireAdmin,
  staffIdValidation,
  validate,
  deleteStaff,
);

export default router;
