import express from "express";
import { handleImageUpload } from "../controllers/upload_controllers.js";

const router = express.Router();

router.post("/", handleImageUpload);

export default router;
