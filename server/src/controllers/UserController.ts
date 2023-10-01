import { Request, Response } from "express";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { generateNewPassword, transporter, prisma } from "../services/Services";

export class UserController {
  // POST
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
          director_id: 1,
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
 
  // add coordinator
  static async AddCoordinator(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const director_id = 1
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      campus ,
      college,
      program,
    } = req.body;
    try {
      await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: "teacher",
          coordinator: {
            create: {
              firstname,
              middlename,
              lastname,
              email,
              contact: Number(contact),
              campus,
              college,
              program,
              director_id: director_id,
              accountStatus: 0
            },
          },
        },
      });
      return res.status(200).json({ username: email, password: newPassowrd });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  } 

  // add trainer
  static async AddTrainer(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const { company_id, firstname, middlename, lastname, email, contact } =
      req.body;
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
              contact: Number(contact),
              companyName: "SM",
              company_id,
              accountStatus: 0
            },
          },
        },
      });
      return res.status(200).json({ username: email, password: newPassowrd });
    } catch (error) {
      return res.status(200).json(error);
    }
  }

   // add teacher
   static async AddTeacher(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      campus ,
      college,
      program,
      major,
      accountStatus,
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
              middlename,
              lastname,
              email,
              contact: Number(contact),
              campus: "Sumacab",
              college: "CICT",
              program: "BSIT",
              major: "Web",
              coordinator_id: 1,
              accountStatus: 0
            },
          },
        },
      });
      return res.status(200).json({ username: email, password: newPassowrd });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

   static async addSingleStudent(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      campus ,
      college,
      program,
      major,
      accountStatus,
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
              middlename,
              lastname,
              email,
              contact: Number(contact),
              campus: "Sumacab",
              college: "CICT",
              program: "BSIT",
              major: "Web",
              coordinator_id: 1,
              accountStatus: 0
            },
          },
        },
      });
      return res.status(200).json({ username: email, password: newPassowrd });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

   //newImport
   static async importStudent(req: any, res: Response) {
    const ExcelData = req.body.excelData;
    const newPassowrd = generateNewPassword();
    try {
      for (const data of ExcelData) {
        const createdUser = await prisma.user.create({
          data: {
            username: data.email,
            password: await argon2.hash(newPassowrd),
            role: "Student",
          },
        });

        await prisma.student.create({
          data: {
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            email: data.email,
            contact: data.contact,
            address: data.address,
            gender: data.gender,
            campus: "Sumacab",
            college: 'CICT',
            program: 'BSIT',
            major: 'Web',
            teacher_id: 1,
            user_id: createdUser.id,
            accountStatus: 0,
            coordinator_id: 1,
            timesheet: {
              createMany: {
                data: generateTimeData(),
              },
            },
          },
        });

        const mailOptions = {
          from: "reynaldobocaling@gmail.com",
          to: data.email,
          subject: "IternTrack!",
          text: `Hello ${data.firstname},\n\nWelcome to InternTrack! Your username is: ${data.email}\nYour password is: ${newPassowrd}\n\nBest regards,\Coordinator`,
        };

        await transporter.sendMail(mailOptions);
      }

      return res.status(201).json("success");
    } catch (error) {
      return res.status(201).json(error);
    }
  }

  

  // GET
  static async getCompanyList(req: any, res: Response) {
    try {
      const response = await prisma.company.findMany({
        include: {
          areaOfAssignment: true,
          trainer: true
        }
      });
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async getTrainerList(req: any, res: Response) {
    try {
      const response = await prisma.trainer.findMany({
        include: {
          company: true,
          student: true
        }
      });
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async getDirector(req: any, res: Response) {
    try {
      const response = await prisma.director.findUnique({
        where: {
          id: 1,
        },
        include: {
          user: true,
          coordinator: {
            include: {
              teacher: {
                include: {
                  student: {
                    include: {
                      teacher: true,
                      trainer: true,
                      AreaOfAssignment: {
                        include: {
                          company: {
                            include: {
                              trainer: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
      });
      return res.status(200).json(response );
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getTrainer(req: any, res: Response) {
    try {
      const response = await prisma.trainer.findUnique({
        where: {
          id: 2,
        },
        include: {
          user: true,
          student: {
            include: {
              teacher: true,
              trainer: true,
              // task: true,
              // timesheet: true,
              AreaOfAssignment: {
                include: {
                  company: true
                }
              }
            }
          }
        },
      });
      return res.status(200).json({ message: response });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getCoordinator(req: any, res: Response) {
    try {
      const response = await prisma.coordinator.findUnique({
        where: {
          id: 1,
        },
        include: {
          user: true,
          teacher: {
            include: {
              student: {
                include: {
                  teacher: true,
                  trainer: true,
                  // task: true,
                  // timesheet: true
                  AreaOfAssignment: {
                    include: {
                      company: true
                    }
                  }
                }
              }
            }
          }
        },
      });
      return res.status(200).json(response );
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getTeacher(req: any, res: Response) {
    try {
      const response = await prisma.teacher.findUnique({
        where: {
          id: 1, //middlewares id req.user[0].teacher.id
        },
        include: {
          user: true,
          student: {
            include: {
              // task: true,
              // timesheet: true
              teacher: true,
              trainer: true,
              AreaOfAssignment: {
                include: {
                  company: true
                }
              }
            }
          }
        },
      });
      return res.status(200).json({ message: response });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getStudent(req: any, res: Response) {
    try {
      const response = await prisma.student.findUnique({
        where: {
          id: 7, //middlewares id req.user.teacher[0].id
        },
        include: {
          user: true,
          // task: true,
          // timesheet: true
          timesheet: true,
          teacher: true,
          trainer:true,
          AreaOfAssignment:{
            include: {
              company: true
            }
          },
        },
      });
      return res.status(200).json(response );
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

 
}


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