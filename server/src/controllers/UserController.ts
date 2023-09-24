import { Request, Response } from "express";
import prisma from "../services/prisma";
import argon2 from "argon2";
import generateNewPassword  from "../services/generatePassword";

import xlsx from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { enUS, tr } from "date-fns/locale";
import nodemailer from "nodemailer";

interface ExcelRow {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  contact: number,
  adress: string,
  gender: string,
  course: string,
}


// interface CustomRequest extends Request {
//   user?: {
//     id: number;
//     username: string;
//     // Iba pang mga field depende sa iyong use case
//   };
// }


export class UserController {
  // add many student
  static async addManyStudent(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
     


    try {
      // const teacherid = req.user;
      
      const file = req.file;
      if(!file) {
        return res.status(400).json({message: 'No file uploaded'});
      }

      const workbook = xlsx.read(file.buffer, {type: "buffer"});
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = xlsx.utils.sheet_to_json(worksheet) as ExcelRow[];
      
      let isValidData = true;

      for (const data of excelData) {
        if (!isDataValid(data)) {
          isValidData = false;
          console.log("error type");
          break;
        }
      }

      if (isValidData) {

        //node mailer
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "reynaldobocaling@gmail.com",
            pass: "scgypyshxqwxdvls",
          },
        });


        for (const data of excelData) {
          const createdUser = await prisma.user.create({
            data: {
              username: data.email,
              password: await argon2.hash(newPassowrd),
              role: "Student",
            }
          });

          await prisma.student.create({
            data: {
              firstname: data.firstname,
              middlename: data.middlename,
              lastname: data.lastname,
              email: data.email,
              contact: data.contact,
              adress: data.adress,
              gender: data.gender,
              course: data.gender,

              user_id: createdUser.id,
              createAt: 'sept',
              timesheet: {
                createMany: {
                  data: generateTimeData(),
                },
              },
            }
          });
        // Send email to the user
        const mailOptions = {
          from: "reynaldobocaling@gmail.com",
          to: data.email,
          subject: "IternTrack!",
          text: `Hello ${data.firstname},\n\nWelcome to InternTrack! Your username is: ${data.email}\nYour password is: ${newPassowrd}\n\nBest regards,\Coordinator`,
        };

        await transporter.sendMail(mailOptions);
        }
        return res.status(200).json("success import");
      } else {
        return res.status(401).json("Failed import");
      }

    } catch (error) {
      return res.status(403).json(error)
    }
  }






  // add company
  static async addCompany(req: any, res: Response) {
    
    const { companyName, address, email, contact, available_positions } =
      req.body;
    const moaUpload = req.file.buffer.toString("base64");
    const parsedAvailablePositions = JSON.parse(available_positions);
    const areasToInsert = parsedAvailablePositions.map((positionData: any) => ({
      areaName: positionData.position,
      slot: positionData.slot,
    }));
    if (!moaUpload) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    try {
      const response = await prisma.company.create({
        data: {
          companyName,
          address,
          email,
          contact: 99,
          moaUpload,
          areaOfAssignment: {
            createMany: {
              data: areasToInsert,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // add teacher
  static async AddTeacherAccount(req: any, res: Response) {
    
    const newPassowrd = generateNewPassword();
    const {
      firstname,
      lastname,
      email,
    } = req.body;
    
    try {
      await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: "teacher",
          teacher: {
            create: {
              firstname,
              lastname,
              email,
              // Iba pang mga field ng teacher na dapat tumpak
            }
          }
        },
      });
      return res.status(200).json({ username: email, password: newPassowrd });
    } catch (error) {
      return res.status(200).json(error);
    }
  }

  // add trainer
  static async AddTrainerAccount(req: any, res: Response) {

    const newPassowrd = generateNewPassword();
    const {
      company_id,
      companyName,
      firstname,
      middlename,
      lastname,
      email,
      address,
      contact,
      gender,
    } = req.body;
    try {
      await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: "trainer",
          trainer: {
            create: {
              firstname,
              middlename,
              lastname,
              email,
              address,
              contact: Number(contact),
              gender,
              company_id,
              companyName,
            },
          },
        },
      });
      return res.status(200).json({username: email,password:newPassowrd});
    } catch (error) {
      return res.status(200).json(error);
    }
  }

  // get company list
  static async getCompanyList(req: any, res: Response) {
    try {
      const response = await prisma.company.findMany({
        include: {
          areaOfAssignment: true,
          trainer: true
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // get trainer list
  static async getTrainerList(req: any, res: Response) {
    try {
      const response = await prisma.trainer.findMany({
        include: {
          student: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

   static async getId (req:any, res:Response) {
    const id = req.user.teacher[0].id;
    res.json(id)
   }
}




// sanitized
const isDataValid = (data: ExcelRow): boolean => {
  if (/\d/.test(data.firstname)) {
    return false;
  }
  if (/\d/.test(data.lastname)) {
    return false;
  }
  // if (/\d/.test(data.name)) {
  //   return false;
  // }
  // if (/\d/.test(data.section)) {
  //   return false;
  // }

  return true;
};




// timesheet
const generateTimeData = () => {
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-05-31");
  const timeData = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const formattedDate = format(currentDate, "MMMM dd", {
        locale: enUS,
      });

      timeData.push({
        timeIn: "0:00",
        timeOut: "0:00",
        totalHours: 0,
        date: formattedDate,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return timeData;
};