import express from "express";
import {
  handleLogout,
  handleUserLogin,
  handleUserSignup,
} from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignup);
router.post("/logout", handleLogout);

export default router;
