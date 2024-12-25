import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";

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
        extractedText: [
          {
            productName: String,
            quantity: Number,
            pricePerUnit: Number,
          },
        ], // OCR result
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const User = model("User", userSchema);

export default User;
