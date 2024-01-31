import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../services/Services";

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  const secret_key = process.env.JWT_SECRET_KEY!;
  try {
    if (!token) return res.status(500).json( "Unauthorized" );

    const decoded:any = jwt.verify(token, secret_key);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        student: {
          include: {notification: true}
        },
        trainer: {
          include: {notification: true}
        },
        teacher: {
          include: {notification: true}
        },
        director: {
          include: {notification: true}
        },
        coordinator: {
          include: {notification: true}
        },
        superadmin:true
      }
    });

    if (!user) return res.status(500).json("Unauthorized" );
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json("Unauthorized");
  }
};

export default verifyToken;



