import User from "../models/user_model";
import ExpressError from "../utils/error";
import wrapAsync from "../utils/wrapAsync";
import bcrypt from "bcryptjs";

export const handleUserLogin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError(404, "Both fields are required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ExpressError(404, "No user found with this email"));
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return next(new ExpressError(400, "Invalid Crenditals"));
  }

  const toekn = user.generateAuthToken();
  return res
    .cookie("auth_token", toekn, { httpOnly: true, secure: false })
    .status(200)
    .json({ message: "login Successfully", success: true });
});
