import { body, param } from "express-validator";

/* ===========================
   CREATE STAFF
=========================== */

export const createStaffValidation = [
  body("firstname")
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("Firstname must be between 2 and 20 characters"),

  body("lastname")
    .notEmpty()
    .withMessage("Lastname is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("Lastname must be between 2 and 20 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone")
    .optional()
    .matches(/^0\d{9}$/)
    .withMessage("Phone must be valid Sri Lankan number"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),
];

/* ===========================
   STAFF ID VALIDATION
=========================== */

export const staffIdValidation = [
  param("id").isMongoId().withMessage("Invalid staff ID"),
];

/* ===========================
   UPDATE STAFF
=========================== */

export const updateStaffValidation = [
  body("firstname")
    .optional()
    .isLength({ min: 2, max: 20 })
    .withMessage("Firstname must be between 2 and 20 characters"),

  body("lastname")
    .optional()
    .isLength({ min: 2, max: 20 })
    .withMessage("Lastname must be between 2 and 20 characters"),

  body("phone")
    .optional()
    .matches(/^0\d{9}$/)
    .withMessage("Phone must be valid Sri Lankan number"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];
