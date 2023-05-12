import { registorValidator, loginValidator } from "../validation/auth.js";
import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import * as userController from "../controllers/userContrroller.js";
import multer from "multer";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const userRouter = express.Router();

//multrt config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

userRouter
  .get("/", userController.home)
  .get("/me/", checkAuth, userController.me)
  .post(
    "/register/",
    registorValidator,
    handleValidationErrors,
    userController.register
  )
  .post("/login/", loginValidator, handleValidationErrors, userController.login)
  .post("/upload/", checkAuth, upload.single("file"), userController.uploader);

export default userRouter;
