import User from "../models/user_model.js";
import ExpressError from "../utils/error.js";
import wrapAsync from "../utils/wrapAsync.js";
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
    .cookie("authToken", toekn, { httpOnly: true, secure: false })
    .status(200)
    .json({
      message: "login Successfully",
      success: true,
      user: { _id: user._id, username: user.username },
    });
});

export const handleUserSignup = wrapAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ExpressError(404, "All fields are required"));
  }

  const hashedPass = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPass,
  });

  const toekn = newUser.generateAuthToken();
  return res
    .cookie("authToken", toekn, { httpOnly: true, secure: false })
    .status(200)
    .json({
      message: "Signup Successfully",
      success: true,
      user: { _id: newUser._id, username: newUser.username },
    });
});
