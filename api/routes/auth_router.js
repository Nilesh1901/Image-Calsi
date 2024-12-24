import express from "express";
import { handleUserLogin } from "../controllers/handleUserLogin_controller.js";

const router = express.Router();

router.post('/login',handleUserLogin)
