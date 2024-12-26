import jwt from "jsonwebtoken";
import ExpressError from "../error.js";

export async function authenticateUser(req, res, next) {
  try {
    const { authToken } = req.cookies;

    if (!authToken) {
      return next(new ExpressError(401, "Unauthorized You must be Loged in"));
    }

    const verifyToken = jwt.verify(authToken, process.env.JWT_SECRET);

    req.userId = verifyToken.userId;
    return next();
  } catch (error) {
    return next(new ExpressError(401, "Unauthorized"));
  }
}
