import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { Request, Response } from "express";
import { prisma } from "../services/Services";

const Login = async (req: Request, res: Response) => {
  const secret_key = process.env.JWT_SECRET_KEY!;
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { username: username },
    });
    if (!user) return res.status(200).json( "Invalid username. Please double check your username and try again.");

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return res.status(200).json( "Incorrect password. Please ensure you've entered the correct password and try again.");
    }

    const token = jwt.sign({ id: user.id }, secret_key, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
     
      secure: true, 
    });
    return res.status(200).json("Success");
  } catch (error:any) {
    return res.status(200).json({ message: error.message });
  }
};

export default Login;
