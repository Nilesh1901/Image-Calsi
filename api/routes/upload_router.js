import express from "express";
import { handleImageUpload } from "../controllers/upload_controllers.js";
import { authenticateUser } from "../utils/middlewares/authUser.js";

const router = express.Router();

router.post("/", authenticateUser, handleImageUpload);

export default router;
