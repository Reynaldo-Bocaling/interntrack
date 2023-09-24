import { NextFunction, Request, Response } from "express";
import prisma from "../services/prisma";
import jwt from "jsonwebtoken";

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  const secret_key = process.env.JWT_SECRET_KEY!;
  try {
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    const decoded:any = jwt.verify(token, secret_key);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        student: true,
        trainer: true,
        teacher: true
      }
    });

    if (!user) return res.status(403).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
