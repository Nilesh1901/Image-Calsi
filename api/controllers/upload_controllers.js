import User from "../models/user_model.js";
import { parseTextAndCalculateTotal } from "../utils/helper.js";
import wrapAsync from "../utils/wrapAsync.js";
import Tesseract from "tesseract.js";

export const handleImageUpload = wrapAsync(async (req, res, next) => {
  const { imageUrl } = req.body;

  // Ensure imageUrl is provided
  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  // Extract text from the image
  const {
    data: { text },
  } = await Tesseract.recognize(imageUrl, "eng");

  // Parse the text and calculate total
  const { products, totalPrice } = parseTextAndCalculateTotal(text);


  // Send the response
  res.status(200).json({
    extractedText: text,
    products,
    totalPrice,
  });
});
