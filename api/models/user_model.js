import { Schema, model, mongo } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "This email is allready taken"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
    },
    images: [
      {
        url: { type: String, required: true }, // Firebase image URL
        extractedText: { type: String }, // OCR result
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
