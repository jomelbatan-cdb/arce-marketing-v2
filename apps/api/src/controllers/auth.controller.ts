import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { ENV } from "../config/env";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("role", user.role, {
      httpOnly: false, // MUST be readable by browser/middleware
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    // Remove password before sending
    const { password: _, ...userSafe } = user.toObject();

    res.status(201).json({ user: userSafe, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15d",
    });

    res.cookie("role", user.role, {
      httpOnly: false, // MUST be readable by browser/middleware
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      path: "/",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      path: "/",
    });

    // Remove password before sending
    const { password: _, ...userSafe } = user.toObject();

    res.status(200).json({ user: userSafe, token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.clearCookie("role");
  res.status(200).json({ message: "Logged out" });
};
