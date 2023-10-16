import { Request, Response, response } from "express";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { generateNewPassword, transporter, prisma } from "../services/Services";


const formattedDate = format(new Date(), 'yyyy-MM-dd');
const formattedTime = format(new Date(), 'HH:mm'); 

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
          contact: Number(contact),
          moaUpload,
          director_id: 2,
          areaOfAssignment: {
            createMany: {
              data: areasToInsert,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error:any) {
      return res.status(500).json(error.message);
    }
  }
 
  // add coordinator
  static async AddCoordinator(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const director_id = req.user.director[0]?.id;
    
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
          role: "Coordinator",
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
          role: "Trainer",
          trainer: {
            create: {
              firstname,
              middlename,
              lastname,
              email,
              contact: Number(contact),
              company_id: Number(company_id),
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
    const coordinator_id  = req.user.coordinator[0]?.id
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
    } = req.body;
    try {
      await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: "Teacher",
          teacher: {
            create: {
              firstname,
              middlename,
              lastname,
              email,
              contact: Number(contact),
              campus,
              college,
              program,
              major,
              coordinator_id: coordinator_id,
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
    const teacher_id = req.user.teacher[0]?.id;

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
            teacher_id: teacher_id,
            user_id: createdUser.id,
            accountStatus: 0,
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


  // add super Admin 
  static async addSuperAdmin(req: any, res: Response){
    const newPassowrd = generateNewPassword();
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact
    } = req.body;

    try {
      await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: 'SuperAdmin',
          superadmin: {
            create: {
              firstname,
              middlename,
              lastname,
              email,
              contact: Number(contact),
              accountStatus: 0
            }
          }
        }
      });

      return res.status(200).json({username: email, password: newPassowrd});
    } catch (error) {
      return res.status(500).json(error)
    }
  }


  // add director
  static async addDirector(req: any, res: Response){
    const newPassowrd = generateNewPassword();
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact
    } = req.body;

    try {
      await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: 'Director',
          director: {
            create: {
              firstname,
              middlename,
              lastname,
              email,
              contact: Number(contact),
              accountStatus: 0
            }
          }
        }
      });

      return res.status(200).json({username: email, password: newPassowrd});
    } catch (error) {
      return res.status(500).json(error)
    }
  }


  // assign Students
  static async assignStudent(req: any, res: Response) {
    const {
       studentId,
       trainer_id,
       areaAssigned_id
      } = req.body;

      try {
        const response = await prisma.student.updateMany({
          where: {
            id: {in: studentId}
          },
          data: {
            trainer_id: Number(trainer_id),
            areaAssigned_id: Number(areaAssigned_id)
          }
        })

        return res.status(200).json(response)
      } catch (error) {
        return res.status(500).json(error)
      }
  }


  // attendance request
  static async attendanceRequest(req: Request, res: Response){
    const {id} = req.body;

    try {
      const response = await prisma.timesheet.update({
        where: {
          id : id
        },
        data: {
          logStatus: 1
        }
      });
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }




  // time in
  static async timeIn(req: Request, res: Response) {
    const { id, timeIn } = req.body;
    
    try {
      const response = await prisma.timesheet.update({
        where: {
          id: id
        },
        data: {
          timeIn
        }
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // time in
  static async timeOut(req: Request, res: Response) {
    const { id, timeOut, totalHours } = req.body;
    
    try {
      const response = await prisma.timesheet.update({
        where: {
          id: id
        },
        data: {
          timeOut,
          totalHours
        }
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }














  // GET
// get director info
  static async getDirector(req: any, res: Response) {
    const director_id = req.user.director[0]?.id
    try {
      const response = await prisma.director.findUnique({
        where: {
          id: director_id,
        },
        include: {
          user: true,
        },
      });
      return res.status(200).json(response );
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get trainer info
  static async getTrainer(req: any, res: Response) {
    const trainer_id = req.user.trainer[0]?.id
    try {
      const response = await prisma.trainer.findUnique({
        where: {
          id: trainer_id,
        },
        include: {
          user: true,
          student: {
            include: {
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
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get coordinator info
  static async getCoordinator(req: any, res: Response) {
    try {
      const coordinator_id = req.user.coordinator[0]?.id
      const response = await prisma.coordinator.findUnique({
        where: {
          id: coordinator_id,
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

  // get teacher info
  static async getTeacher(req: any, res: Response) {
    const teacher_id = req.user.teacher[0]?.id
    try {
      const response = await prisma.teacher.findUnique({
        where: {
          id: teacher_id,
        },
        include: {
          user: true,
          student: {
            include: {
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
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get student info
  static async getStudent(req: any, res: Response) {
    const studentId = req.user.student[0]?.id
    try {
      const response = await prisma.student.findUnique({
        where: {
          id: studentId, 
        },
        include: {
          user: true,
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

  // get campus info
  static async getCampus(req: any, res: Response){
    try {
      const response = await prisma.campus.findMany({
        include: {
          college: {
            include: {
              program: {
                include: {
                  major: true
                }
              }
            }
          },

        }
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error)
    }
  }  
  

  // get student info
  static async getStudentInfo(req: any, res: Response){
    try {
      const id = parseInt(req.params.id);
      const response = await prisma.student.findUnique({
        where: {id: id},
        include: {
          task:true,
          timesheet: true,
          AreaOfAssignment:{
            include: {company:true}
          },
          teacher: true,
          trainer: true
        }
      });
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }


  

  // get list
  // get Director List
  static async getDirectorList(req: any, res: Response) {
    try {
      const response = await prisma.director.findMany({});
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  // get Coordinator List
  static async getCoordinatorList(req: any, res: Response) {
    try {
      const response = await prisma.coordinator.findMany({
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
                      },
                    }
                  }
                }
              }
            }
          }
        }
      });
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  
  static async getStudentList(req: any, res: Response){
    try {
      const response = await prisma.student.findMany({
        include: {
          task: true,
          timesheet: true,
          trainer: true,
          AreaOfAssignment:{
            include: {
              company: true
            }
          }
        }
      })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({message: error})
    }
  }

  // get company list
  static async getCompanyList(req: any, res: Response) {
    try {
      const response = await prisma.company.findMany({
        include: {
          areaOfAssignment: {
            include: {
              student: {
                include:{
                  trainer:true,
                  timesheet:true,
                  AreaOfAssignment:true
                }
              }
            }
          },
          trainer: {
            include: {
              student:true
            }
          }
        }
      });
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  // get trainer list
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


  static async getTeacherList(req:any, res:Response) {
    try {
      const response = await prisma.teacher.findMany({
        include: {
          student: true
        }
      })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }







  //  records timesheet/task
  static async getTimesheet(req: any, res: Response) {
    const studentId = req.user.student[0]?.id
    try {
      const response = await prisma.timesheet.findMany({
        where: {
          student_id: Number(studentId)
        }
      })
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

 

}

// timesheet
// const generateTimeData = () => {
//   const startDate = new Date("2023-09-04");
//   const endDate = new Date("2023-12-15");
//   const timeData = [];

//   let currentDate = new Date(startDate);
//   let weekNumber = 1;

//   while (currentDate <= endDate) {
//     const dayOfWeek = currentDate.getDay();

//     if (dayOfWeek >= 1 && dayOfWeek <= 5) {
//       const formattedDate = format(currentDate, "yyyy-MM-dd");

//       timeData.push({
//         timeIn: "0:00",
//         timeOut: "0:00",
//         totalHours: 0,
//         date: formattedDate,
//         logStatus:0
//       });
//     }
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return timeData;
// };



const generateTimeData = () => {
  const startDate = new Date("2023-09-04");
  const endDate = new Date("2023-12-15");
  const timeData = [];

  let currentDate = new Date(startDate);
  let weekCounter = 1;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const formattedDate = format(currentDate, "yyyy-MM-dd");

      timeData.push({
        timeIn: "0:00",
        timeOut: "0:00",
        totalHours: 0,
        date: formattedDate,
        logStatus: 0,
        week: weekCounter,
      });

      if (timeData.length % 5 === 0) {
        weekCounter++;
      }
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return timeData;
};




