import { body } from "express-validator";

/* ===========================
   UPDATE STAFF PROFILE
=========================== */

export const updateStaffProfileValidation = [
  body("firstname")
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Firstname must be between 2 and 20 characters"),

  body("lastname")
    .optional()
    .trim()
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
];
