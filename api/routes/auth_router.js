import express from "express";
import {
  handleUserLogin,
  handleUserSignup,
} from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignup);

export default router;
