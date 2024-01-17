import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../services/Services";

const verifyCode = async (req:any, res:Response, next:NextFunction) => {
    const code = req.cookie.verficationCode;
    const secret_key = process.env.JWT_SECRET_KEY!;

    try {
        if(!code) { return res.status(404).json('not found'); }
        const decoded:any = jwt.verify(code, secret_key);

        req.user = decoded.code;
        next();
  
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default verifyCode;