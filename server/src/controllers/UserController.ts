import { Request, Response } from "express";
import prisma from "../services/prisma";
import argon2 from "argon2";

export class UserController {
  static async createStudentAccount(req: Request, res: Response) {
    const { name, username, password } = req.body;
    try {
      const response = await prisma.user.create({
        data: {
          username,
          password: await argon2.hash(password),
          role: "Student",
          student: {
            create: {
              name,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createDirectorAccount(req: Request, res: Response) {
    const { name, username, password } = req.body;
    try {
      const response = await prisma.user.create({
        data: {
          username,
          password: await argon2.hash(password),
          role: "Student",
          director: {
            create: {
              name,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  
}
