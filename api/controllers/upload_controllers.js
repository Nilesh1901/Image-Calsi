import wrapAsync from "../utils/wrapAsync.js";

export const handleImageUpload = wrapAsync(async (req, res, next) => {
  console.log(req.body);
});
