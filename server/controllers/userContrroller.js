import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const home = (req, res) => {
  res.send("Gut");
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password, avatarUrl } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: passwordHash,
      avatarUrl,
    });

    const token = jwt.sign({ _id: user._id }, process.env.SC, {
      expiresIn: "30d",
    });

    const { password: passwordHashed, ...userData } = user._doc;
    res.status(200).json({ ...userData, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to register" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({ message: "Invaled email or password" });
    }

    const passIsValid = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );

    if (!passIsValid) {
      return res.status(403).json({ message: "Invaled email or password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SC,
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userData } = user._doc;
    res.status(200).json({ userData, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Feild to Login" });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userData } = user._doc;
    res.status(200).json({ userData });
  } catch (err) {
    res.status(403).json({ message: "Access Denied" });
    console.error(err);
  }
};

export const uploader = (req, res) => {
  res.status(200).json({ url: `/uploads/${req.file.originalname}` });
};
