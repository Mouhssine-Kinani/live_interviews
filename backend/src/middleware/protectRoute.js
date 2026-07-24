import { getAuth } from "@clerk/express";
import User from "../models/User.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated)
      return res.status(401).json({ message: "Unauthorized - invalid token" });

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ message: "User Not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protect route middleware");
    res.status(500).json({ message: "Internal server error" });
  }
};
