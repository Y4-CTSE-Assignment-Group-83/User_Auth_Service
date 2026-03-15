import express from "express";
import { requireStaff, verifyToken } from "../middleware/auth.middleware.js";
import {
  getStaffProfile,
  updateStaffProfile,
} from "../controllers/staff.controller.js";
import { updateStaffProfileValidation } from "../validators/staff.validators.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Staff Profile
 *   description: Staff self profile management
 */

/**
 * @swagger
 * /api/staff/profile:
 *   get:
 *     summary: Get staff profile
 *     tags: [Staff Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Staff profile retrieved successfully
 */
router.get("/profile", verifyToken, requireStaff, getStaffProfile);

/**
 * @swagger
 * /api/staff/profile:
 *   put:
 *     summary: Update staff profile
 *     tags: [Staff Profile]
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
  requireStaff,
  updateStaffProfileValidation,
  validate,
  updateStaffProfile,
);

export default router;
