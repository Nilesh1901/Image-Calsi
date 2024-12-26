import User from "../models/user_model.js";
import { parseTextAndCalculateTotal } from "../utils/helper.js";
import wrapAsync from "../utils/wrapAsync.js";
import Tesseract from "tesseract.js";

export const handleImageUpload = wrapAsync(async (req, res, next) => {
  const { imageUrl } = req.body;
  const { userId } = req;

  // Ensure imageUrl is provided
  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  // Extract text from the image using Tesseract.js
  const {
    data: { text },
  } = await Tesseract.recognize(imageUrl, "eng");

  // Parse the text and calculate total
  const { products, totalPrice } = parseTextAndCalculateTotal(text);

  // Update the user's images array
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        images: {
          url: imageUrl,
          extractedText: products, // Store parsed product details
          uploadedAt: new Date(), // Add current timestamp
        },
      },
    },
    { new: true }
  );

  // If the user was not found, handle the error
  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // Send the response
  res.status(200).json({
    extractedText: text,
    products,
    totalPrice,
  });
});
