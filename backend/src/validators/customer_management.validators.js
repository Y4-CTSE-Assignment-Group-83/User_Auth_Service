import { body, param } from "express-validator";

/* ===========================
   VALIDATE CUSTOMER ID
=========================== */

export const customerIdValidation = [
  param("id").isMongoId().withMessage("Invalid customer ID"),
];

/* ===========================
   UPDATE CUSTOMER (ADMIN)
=========================== */

export const updateCustomerValidation = [
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
    .isIn(["MALE", "FEMALE", "OTHER"])
    .withMessage("Gender must be MALE, FEMALE, or OTHER"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];
