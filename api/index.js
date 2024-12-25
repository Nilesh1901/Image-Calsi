import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth_router.js";
import uploadRouter from "./routes/upload_router.js";
import { ConnectDB } from "./utils/connectDB.js";

dotenv.config();

// connecting Database

ConnectDB();

const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(cookieParser());

// routes

app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);

// Error middleware

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "server error" } = err;

  res.statusCode(statusCode).json({
    success: false,
    message,
  });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`app is running on port ${process.env.PORT}`)
);
