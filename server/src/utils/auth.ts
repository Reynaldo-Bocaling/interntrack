import prisma from "../services/prisma";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { Request, Response } from "express";

export const Login = async (req: Request, res: Response) => {
  const secret_key = process.env.JWT_SECRET_KEY!;
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { username: username },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword)
      return res.status(404).json({ message: "Incorrect password" });
    
    const token = jwt.sign({ id: user.id }, secret_key, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "success Login" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
