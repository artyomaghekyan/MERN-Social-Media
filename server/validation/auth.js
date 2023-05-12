import { body } from "express-validator";

export const registorValidator = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password is too short").isLength({ min: 5 }),
  body("fullName", "Full name is too short").isLength({ min: 3 }),
  body("avatarUrl", "Invalid Url").optional().isURL(),
];

export const loginValidator = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password is too short").isLength({ min: 5 }),
];

export const postCreationValidator = [
  body("title", "Post title is required").isLength({ min: 3 }).isString(),
  body("text", "Post description is required").isLength({ min: 10 }).isString(),
  body("tags", "Invalid teg format").optional().isArray(),
  body("imageUrl", "Image url in not valid").optional().isString(),
];
