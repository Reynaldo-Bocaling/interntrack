import { PrismaClient } from "@prisma/client";
import generatePassword from "generate-password";
import nodemailer from "nodemailer";


export const prisma = new PrismaClient();

export const generateNewPassword = () => {
  const currentYear = new Date().getFullYear();
  const generatePass = generatePassword.generate({
    length: 6,
    numbers: true,
    uppercase: false,
    lowercase: false,
    symbols: false,
  });

  return `${currentYear}-${generatePass}`;
};

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "interntracksystem@gmail.com",
      pass: "ixqy gxwb jdpr ewfo",
    },
  });

  export const verificationCode = () => {
    
    const code = generatePassword.generate({
      length: 4,
      numbers: true,
      uppercase: false,
      lowercase: false,
      symbols: false,
    });
  
    return code;
  };