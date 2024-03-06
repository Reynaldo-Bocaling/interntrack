import { Request, Response, response } from "express";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { generateNewPassword, verificationCode, transporter, prisma } from "../services/Services";
import jwt from "jsonwebtoken";
import fs from "fs";

const formattedDate = format(new Date(), "yyyy-MM-dd");
const formattedTime = format(new Date(), "HH:mm");

export class UserController {
  // POST
  // add company
  static async addCompany(req: any, res: Response) {
    const director_id = req.user.director[0]?.id;

    const { companyName, address, email, contact, available_positions } =
      req.body;

    const moaUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    const moaFilename = req.file?.filename;

    const parsedAvailablePositions = JSON.parse(available_positions);

    const areasToInsert = parsedAvailablePositions.map((positionData: any) => ({
      areaName: positionData.position,
      slot: positionData.slot,
    }));

    try {
      const response = await prisma.company.create({
        data: {
          companyName,
          address,
          email,
          contact: contact,
          moaUpload: moaFilename,
          moaUrl: moaUrl,
          director_id: Number(director_id),
          areaOfAssignment: {
            createMany: {
              data: areasToInsert,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  // add coordinator
  static async AddCoordinator(req: any, res: Response) {
    const newPassowrd = generateNewPassword();

    const {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      campus,
      college,
      program,
    } = req.body;
    try {
      const coordinatorAccount = await prisma.user.create({
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
              contact,
              campus,
              college,
              program,
              accountStatus: 0,
            },
          },
        },
        include: {
          coordinator: true,
        },
      });

      if (!coordinatorAccount) return res.status(500).json("errror");

      await prisma.notification.create({
        data: {
          title: "Added Successfully",
          description:
            " We area pleased to inform you that you have been added to the InternTrack system as a Coordinator. Your role in overseeing OJT matters is now active.",
          date: formattedDate,
          coordinator_id: coordinatorAccount?.coordinator[0].id,
        },
      });

      const mailOptions = {
        from: "reynaldobocaling@gmail.com",
        to: email,
        subject: "IternTrack!",
        html: `
        <p style="color: blue;">Welcome, ${firstname}!</p>
        <p>You have been successfully added to the InternTrack system as a Coordinator.</p>
        <p>Your username is: ${email}</p>
        <p>Your password is: ${newPassowrd}</p>
        <p>You can now log in to the InternTrack system to manage and coordinate activities within your assigned area.</p>
          <p>Thank you,</p>
      `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json(coordinatorAccount);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  // add coordinator
  static async PromoteAsCoordinator(req: any, res: Response) {
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      campus,
      college,
      program,
      user_id,
    } = req.body;
    try {
      await prisma.coordinator.create({
        data: {
          firstname,
          middlename,
          lastname,
          email,
          contact,
          campus,
          college,
          program,
          accountStatus: 0,
          user_id,
        },
      });

      return res.status(200).json("success");
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  // add trainer
  static async AddTrainer(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const coordinator = req.user.coordinator[0];
    const teacher = req.user.teacher[0];

    const username = req.user.username?.toLowerCase();

    const {
      area_id,
      firstname,
      middlename,
      lastname,
      email,
      contact,
      isToggle,
    } = req.body;
    try {
      if (username.includes(email.toLowerCase()) && isToggle) {
        const trainerAccount = await prisma.trainer.create({
          data: {
            firstname: coordinator?.firstname ?? teacher?.firstname,
            middlename: coordinator?.middlename ?? teacher?.middlename,
            lastname: coordinator?.lastname ?? teacher?.lastname,
            email: coordinator?.email ?? teacher?.email,
            contact: coordinator?.contact ?? teacher?.contact,
            areaAssign_id: Number(area_id),
            accountStatus: 0,
            user_id: req.user.id,
            profile: coordinator?.profile ?? teacher?.profile,
            profile_url: coordinator?.profile_url ?? teacher?.profile_url,
          },
        });

        // if(!trainerAccount) return res.status(500).json('errror')

        // await prisma.notification.create({
        //   data: {
        //     title: 'Added Successfully',
        //     description: ' We area pleased to inform you that you have been added to the InternTrack system as a Trainer. Your role in overseeing OJT matters is now active.',
        //     date: formattedDate,
        //     teacher_id: trainerAccount?.id
        //   }
        // })
        return res.status(200).json("success");
      } else {
        const trainerAccount = await prisma.user.create({
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
                contact,
                areaAssign_id: Number(area_id),
                accountStatus: 0,
              },
            },
          },
          include: {
            trainer: true,
          },
        });

        if (!trainerAccount) return res.status(500).json("errror");

        await prisma.notification.create({
          data: {
            title: "Added Successfully",
            description: "test",
            date: formattedDate,
            trainer_id: trainerAccount?.trainer[0].id,
          },
        });

        const mailOptions = {
          from: "reynaldobocaling@gmail.com",
          to: email,
          subject: "IternTrack!",
          html: `
          <p style="color: blue;">Welcome, ${firstname}!</p>
          <p>You have been successfully added to the InternTrack system as a Trainer.</p>
          <p>Your username is: ${email}</p>
          <p>Your password is: ${newPassowrd}</p>
          <p>You can now log in to the InternTrack system to manage and guide your assigned students.</p>
          <p>Thank you!</p>
        `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json("success");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // add teacher
  static async AddTeacher(req: any, res: Response) {
    const coordinator_id = req.user.coordinator[0]?.id;
    const coordinatorEmail = req.user.username?.toLowerCase();
    const newPassowrd = generateNewPassword();
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      campus,
      college,
      program,
      major,
      isToggle,
      profile,
      profile_url,
    } = req.body;

    try {
      if (coordinatorEmail.includes(email.toLowerCase()) && isToggle) {
        const teacherAccount = await prisma.teacher.create({
          data: {
            firstname,
            middlename,
            lastname,
            email,
            contact,
            campus,
            college,
            program,
            major,
            coordinator_id: coordinator_id,
            accountStatus: 0,
            user_id: req.user.id,
            profile,
            profile_url,
          },
        });

        if (!teacherAccount) return res.status(500).json("errror");

        await prisma.notification.create({
          data: {
            title: "Added Successfully",
            description:
              " We area pleased to inform you that you have been added to the InternTrack system as a Teacher. Your role in overseeing OJT matters is now active.",
            date: formattedDate,
            teacher_id: teacherAccount?.id,
          },
        });
      } else {
        const teacherAccount = await prisma.user.create({
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
                contact,
                campus,
                college,
                program,
                major,
                coordinator_id: coordinator_id,
                accountStatus: 0,
              },
            },
          },
          include: {
            teacher: true,
          },
        });

        if (!teacherAccount) return res.status(500).json("errror");

        await prisma.notification.create({
          data: {
            title: "Added Successfully",
            description: "test",
            date: formattedDate,
            teacher_id: teacherAccount?.teacher[0].id,
          },
        });

        const mailOptions = {
          from: "reynaldobocaling@gmail.com",
          to: email,
          subject: "IternTrack!",
          html: `
          <p style="color: blue;">Welcome, ${firstname}!</p>
          <p>You have been successfully added to the InternTrack system as a Teacher.</p>
          <p>Your username is: ${email}</p>
          <p>Your password is: ${newPassowrd}</p>
          <p>You can now log in to the InternTrack system to manage and guide your assigned students.</p>
          <p>Thank you!</p>
        `,
        };

        await transporter.sendMail(mailOptions);
      }

      return res.status(200).json({ username: email, password: newPassowrd });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  static async addSingleStudent(req: any, res: Response) {
    const teacher_id = req.user.teacher[0]?.id;

    const newPassowrd = generateNewPassword();
    const {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      gender,
      major,
      address,
      section
    } = req.body;
    try {
      const findTeacher = await prisma.teacher.findUnique({
        where: {
          id: teacher_id,
        },
      });

      if (!findTeacher) return res.status(404).json("teacher not found");

      const dates = await prisma.dateRangeTimesheet.findFirst({
        where: { teacher_id },
      });

      if (!dates) {
        return res.status(500).json("not set range date");
      }

      const startDate = dates?.start_date;
      const endDate = dates?.end_date;

      const studentAccount = await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: "Student",
          student: {
            create: {
              firstname,
              middlename,
              lastname,
              gender,
              email,
              address,
              section,
              contact: contact.toString(),
              campus: findTeacher?.campus,
              college: findTeacher?.college,
              program: findTeacher?.program,
              major: major,
              accountStatus: 0,
              deletedStatus: 0,
              teacher_id: teacher_id,
              createAt: formattedDate,
              timesheet: {
                createMany: {
                  data: generateTimeData(startDate, endDate),
                },
              },
            },
          },
        },
        include: {
          student: true,
        },
      });

      if (!studentAccount) return res.status(500).json("errror");

      await prisma.notification.create({
        data: {
          title: "Added Successfully",
          description:
            " We area pleased to inform you that you have been added to the InternTrack system as a Student. Your role in overseeing OJT matters is now active.",
          date: formattedDate,
          student_id: studentAccount?.student[0].id,
        },
      });

      const mailOptions = {
        from: "reynaldobocaling@gmail.com",
        to: email,
        subject: "IternTrack!",
        html: `
          <p style="color: blue;">Congratulations, ${firstname}!</p>
          <p>You have been successfully added to the InternTrack system. You are now part of our program, and we are in the process of assigning you to a company.</p>
          <p>Your username is: ${email}</p>
          <p>Your password is: ${newPassowrd}</p>
          <p>Please note that you are not yet allowed to log in and start your time logs. Kindly wait until you receive further instructions on your company assignment.</p>
          <p>Goodluck!</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json("success");
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
      const findTeacher = await prisma.teacher.findUnique({
        where: {
          id: teacher_id,
        },
      });

      if (!findTeacher) return res.status(404).json("teacher not found");

      const dates = await prisma.dateRangeTimesheet.findFirst({
        where: { teacher_id },
      });

      if (!dates) {
        return res.status(500).json("not set range date");
      }

      const startDate = dates?.start_date;
      const endDate = dates?.end_date;

      for (const data of ExcelData) {
        const createdUser = await prisma.user.create({
          data: {
            username: data.email,
            password: await argon2.hash(newPassowrd),
            role: "Student",
          },
        });

        const studentAccount = await prisma.student.create({
          data: {
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            email: data.email,
            contact: data.contact.toString(),
            address: data.address,
            section: data.section,
            gender: data.gender,
            campus: findTeacher?.campus,
            college: findTeacher?.college,
            program: findTeacher?.program,
            major: data.major,
            teacher_id: teacher_id,
            user_id: createdUser.id,
            accountStatus: 0,
            deletedStatus: 0,
            createAt: formattedDate,
            timesheet: {
              createMany: {
                data: generateTimeData(startDate, endDate),
              },
            },
          },
        });

        if (!studentAccount) return res.status(500).json("errror");

        await prisma.notification.create({
          data: {
            title: "Added Successfully",
            description:
              " We area pleased to inform you that you have been added to the InternTrack system as a Student. Your role in overseeing OJT matters is now active.",
            date: formattedDate,
            student_id: studentAccount?.id,
          },
        });


        const mailOptions = {
          from: "reynaldobocaling@gmail.com",
          to: data.email,
          subject: "IternTrack!",
          html: `
            <p style="color: blue;">Congratulations, ${data.firstname}!</p>
            <p>You have been successfully added to the InternTrack system. You are now part of our program, and we are in the process of assigning you to a company.</p>
            <p>Your username is: ${data.email}</p>
            <p>Your password is: ${newPassowrd}</p>
            <p>Please note that you are not yet allowed to log in and start your time logs. Kindly wait until you receive further instructions on your company assignment.</p>
            <p>Goodluck!</p>
          `,
        };
        await transporter.sendMail(mailOptions);

        // const mailOptions = {
        //   from: "reynaldobocaling@gmail.com",
        //   to: data.email,
        //   subject: "IternTrack!",
        //   text: `Hello ${data.firstname},\n\nWelcome to InternTrack! Your username is: ${data.email}\nYour password is: ${newPassowrd}\n\nBest regards,\Coordinator`,
        // };

       
      }

      return res.status(201).json("success");
    } catch (error) {
      return res.status(201).json(error);
    }
  }

  // add super Admin
  static async addSuperAdmin(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const { firstname, lastname, email, contact } = req.body;

    try {
      await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: "SuperAdmin",
          superadmin: {
            create: {
              firstname,
              lastname,
              email,
              contact,
              accountStatus: 0,
            },
          },
        },
      });

      const mailOptions = {
        from: "reynaldobocaling@gmail.com",
        to: email,
        subject: "IternTrack!",
        html: `
        <p style="color: blue;">Congratulations, ${firstname}!</p>
        <p>You have been successfully added to the InternTrack system as a Super admin.</p>
        <p>Your username is: ${email}</p>
        <p>Your password is: ${newPassowrd}</p>
        <p>You can now log in to the InternTrack system to manage and oversee the entire platform.</p>
        <p>Thank you for your contributions!</p>
        <p>Best regards,</p>
      `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ username: email, password: newPassowrd });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // add director
  static async addDirector(req: any, res: Response) {
    const newPassowrd = generateNewPassword();
    const { firstname, middlename, lastname, email, contact } = req.body;

    try {
      const directorAccount = await prisma.user.create({
        data: {
          username: email,
          password: await argon2.hash(newPassowrd),
          role: "Director",
          director: {
            create: {
              firstname,
              middlename,
              lastname,
              email,
              contact,
              accountStatus: 0,
            },
          },
        },
        include: {
          director: true,
        },
      });

      if (!directorAccount) return res.status(500).json("errror");

      await prisma.notification.create({
        data: {
          title: "Added Successfully",
          description:
            " We area pleased to inform you that you have been added to the InternTrack system as a Director. Your role in overseeing OJT matters is now active.",
          date: formattedDate,
          director_id: directorAccount?.director[0].id,
        },
      });

      const mailOptions = {
        from: "reynaldobocaling@gmail.com",
        to: email,
        subject: "IternTrack!",
        html: `
        <p style="color: blue;">Welcome, ${firstname}!</p>
        <p>You have been successfully added to the InternTrack system as a Director.</p>
        <p>Your username is: ${email}</p>
        <p>Your password is: ${newPassowrd}</p>
        <p>You can now log in to the InternTrack system to oversee and manage the entire program.</p>
        <p>Thank you for your leadership!</p>
      `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json("successs");
    } catch (error) {
      return res.status(500).json(error);
    }
  }


  static async updateDirect(req:any, res: Response){
    const {id,firstname, lastname, contact, email} =req.body;

    try {
      const response = await  prisma.director.update({
        data: {
          firstname,
          lastname,
          contact,
          email
        },
        where: {id}
      });

      res.status(200).json( response)
    } catch (error) {
      res.status(500).json(error)
    }
  }


  // assign Students
  static async assignStudent(req: any, res: Response) {
    const { studentId, trainer_id, areaAssigned_id, companyName,trainerName, area } = req.body;
  
    try {
      const response = await prisma.student.updateMany({
        where: {
          id: { in: studentId },
        },
        data: {
          trainer_id: Number(trainer_id),
          areaAssigned_id: Number(areaAssigned_id),
        },
      });
  
      // Send email to each student
      const students = await prisma.student.findMany({
        where: {
          id: { in: studentId },
        },
      });
  
      for (const student of students) {
        const { email, firstname } = student; 
        const mailOptions = {
          from: 'reynaldobocaling@gmail.com',
          to: email,
          subject: 'IternTrack - Successful Assignment',
          html: `
          <p style="font-size: 1.2rem; color: #2193EE;">Hello <strong>${firstname}</strong>,</p>
          <p>Congratulations! You have been successfully assigned to <span style="color: #2193EE;">${companyName}</span> in the <span style="color: #2193EE;">${area}</span> area under the guidance of Trainer <span style="color: #2193EE;">${trainerName}</span>.</p>
          
          <p>To begin your exciting journey, please log in to the <span style="color: #2193EE;">InternTrack</span> system and start your time logs.</p>
          <p>Goodluck.</p>
        `,}
  
        await transporter.sendMail(mailOptions);
      }
  
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  


  // attendance request
  static async attendanceRequest(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const response = await prisma.timesheet.update({
        where: {
          id: id,
        },
        data: {
          logStatus: 1,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // campuses
  //add campus
  static async addCampus(req: any, res: Response) {
    const campus_Location = req.body.campus_Location;

    try {
      const alreadyExist = await prisma.campus.findFirst({
        where: { campus_Location },
      });
      if (alreadyExist) return res.status(500).json("Campus is already exist");

      const response = await prisma.campus.create({
        data: { campus_Location },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //add collge
  static async addCollege(req: any, res: Response) {
    const { college_description, campus_id } = req.body;

    try {
      const alreadyExist = await prisma.college.findFirst({
        where: {
          college_description,
          campus_id: Number(campus_id),
        },
      });

      if (alreadyExist) return res.status(500).json("College is already exist");

      const response = await prisma.college.create({
        data: {
          college_description,
          campus_id: Number(campus_id),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //add program
  static async addProgram(req: any, res: Response) {
    const { program_description, college_id, trainingHours } = req.body;

    try {
      const alreadyExist = await prisma.program.findFirst({
        where: {
          program_description,
          college_id,
        },
      });

      if (alreadyExist) return res.status(500).json("Program is already exist");

      const response = await prisma.program.create({
        data: {
          program_description,
          college_id,
          trainingHours: Number(trainingHours),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //add major
  static async addMajor(req: any, res: Response) {
    const { major_description, program_id } = req.body;

    try {
      const alreadyExist = await prisma.major.findFirst({
        where: {
          major_description,
          program_id,
        },
      });

      if (alreadyExist) return res.status(500).json("Major is already exist");
      const response = await prisma.major.create({
        data: {
          major_description,
          program_id,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }


  //delete
  static async deleteDirector(req:any, res:Response){
    const id = req.params.id;

    try {
      const response = await prisma.director.delete({
        where: {id}
      });

      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
    
  }

  //delete campuses
  static async deleteCampus(req: any, res: Response) {
    const { id } = req.params;
    try {
      await prisma.campus.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteCollege(req: any, res: Response) {
    const { id } = req.params;
    try {
      await prisma.college.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteProgram(req: any, res: Response) {
    const { id } = req.params;
    try {
      await prisma.program.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteMajor(req: any, res: Response) {
    const { id } = req.params;
    try {
      await prisma.major.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //update campuses
  static async updateCampus(req: any, res: Response) {
    const { id, campus_Location } = req.body;

    try {
      await prisma.campus.update({
        where: {
          id,
        },
        data: {
          campus_Location,
        },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updateCollege(req: any, res: Response) {
    const { id, college_description } = req.body;

    try {
      await prisma.college.update({
        where: {
          id,
        },
        data: {
          college_description,
        },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateProgram(req: any, res: Response) {
    const { id, program_description, trainingHours } = req.body;

    try {
      await prisma.program.update({
        where: {
          id,
        },
        data: {
          program_description,
          trainingHours: Number(trainingHours),
        },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateMajor(req: any, res: Response) {
    const { id, major_description } = req.body;

    try {
      await prisma.major.update({
        where: {
          id,
        },
        data: {
          major_description,
        },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateAreaSlot(req: any, res: Response) {
    const { id, slot } = req.body;

    try {
      await prisma.areaOfAssignment.update({
        where: {
          id,
        },
        data: {
          slot,
        },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // time in
  static async timeIn(req: Request, res: Response) {
    const { id, timeIn } = req.body;

    try {
      const response = await prisma.timesheet.update({
        where: {
          id: id,
        },
        data: {
          timeIn,
        },
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
          id: id,
        },
        data: {
          timeOut,
          totalHours,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // GET
  // get super admin info
  static async getSuperAdmin(req: any, res: Response) {
    const admin_id = req.user.superadmin[0]?.id;
    try {
      const response = await prisma.superAdmin.findUnique({
        where: {
          id: admin_id,
        },
        include: {
          user: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  // get director info
  static async getDirector(req: any, res: Response) {
    const director_id = req.user.director[0]?.id;
    try {
      const response = await prisma.director.findUnique({
        where: {
          id: director_id,
        },
        include: {
          user: true,
          notification: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get trainer info
  static async getTrainer(req: any, res: Response) {
    const trainer_id = req.user.trainer[0]?.id;
    try {
      const response = await prisma.trainer.findUnique({
        where: {
          id: trainer_id,
        },
        include: {
          user: true,
          notification: true,
          student: {
            include: {
              teacher: true,
              trainer: true,
              AreaOfAssignment: {
                include: {
                  company: true,
                },
              },
            },
          },
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
      const coordinator_id = req.user.coordinator[0]?.id;
      const response = await prisma.coordinator.findUnique({
        where: {
          id: coordinator_id,
        },
        include: {
          user: true,
          notification: true,
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
                      company: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get teacher info
  static async getTeacher(req: any, res: Response) {
    const teacher_id = req.user.teacher[0]?.id;
    try {
      const response = await prisma.teacher.findUnique({
        where: {
          id: teacher_id,
        },
        include: {
          notification: true,
          coordinator: {
            include: {
              teacher: {
                include: {
                  student: true,
                },
              },
            },
          },
          user: true,
          student: {
            include: {
              teacher: true,
              trainer: true,
              AreaOfAssignment: {
                include: {
                  company: true,
                },
              },
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get student info
  static async getStudent(req: any, res: Response) {
    const studentId = req.user.student[0]?.id;
    try {
      const response = await prisma.student.findUnique({
        where: {
          id: studentId,
        },
        include: {
          user: true,
          announcement: true,
          notification: true,
          teacher: {
            include: {
              coordinator: true,
            },
          },
          trainer: true,
          AreaOfAssignment: {
            include: {
              company: true,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get campus info
  static async getCampus(req: any, res: Response) {
    try {
      const response = await prisma.campus.findMany({
        include: {
          college: {
            include: {
              campus: true,
              program: {
                include: {
                  college: {
                    include: {
                      campus: true,
                    },
                  },
                  major: {
                    include: {
                      program: {
                        include: {
                          college: {
                            include: {
                              campus: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // get student info
  static async getStudentInfo(req: any, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await prisma.student.findUnique({
        where: { id: id },
        include: {
          task: true,
          timesheet: true,
          requirement: true,
          AreaOfAssignment: {
            include: { company: true },
          },
          teacher: true,
          trainer: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // get list
  // get Director List
  static async getDirectorList(req: any, res: Response) {
    try {
      const response = await prisma.director.findMany({});
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
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
                      trainer: true,
                      company: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getStudentList(req: any, res: Response) {
    try {
      const response = await prisma.student.findMany({
        include: {
          task: true,
          timesheet: true,
          trainer: true,
          AreaOfAssignment: {
            include: {
              company: true,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get company list
  static async getCompanyList(req: any, res: Response) {
    try {
      const response = await prisma.company.findMany({
        include: {
          areaOfAssignment: {
            include: {
              trainer: {
                include: {
                  student: true,
                },
              },
              student: {
                include: {
                  trainer: true,
                  timesheet: true,
                  AreaOfAssignment: {
                    include: {
                      trainer: true,
                    },
                  },
                },
              },
            },
          },
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
          areaofAssignment: {
            include: {
              company: true,
            },
          },
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }


  // get trainer list
  static async getAdminList(req: any, res: Response) {
    try {
      const response = await prisma.superAdmin.findMany({});
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getTeacherList(req: any, res: Response) {
    try {
      const response = await prisma.teacher.findMany({
        include: {
          student: true,
          coordinator: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //  records timesheet/task
  static async getTimesheet(req: any, res: Response) {
    const studentId = req.user.student[0]?.id;
    try {
      const response = await prisma.timesheet.findMany({
        where: {
          student_id: Number(studentId),
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get requirements
  static async getRequirement(req: any, res: Response) {
    const id = req.user.student[0]?.id;
    try {
      const response = await prisma.requirement.findMany({
        where: {
          student_id: id,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get requirements
  static async getTask(req: any, res: Response) {
    const id = req.user.student[0]?.id;
    try {
      const response = await prisma.task.findMany({
        where: {
          student_id: id,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get Announcement
  static async getAnnouncement(req: any, res: Response) {
    try {
      const response = await prisma.announcement.findMany({});
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }







  // update profile user
  // update coordinator
  static async EditCoordinatorProfile(req: any, res: Response) {
    const { item } = req.body;

    try {
      const id = req.user.coordinator[0].id;
      const response = await prisma.coordinator.update({
        where: {
          id: id,
        },
        data: {
          firstname: item.firstname,
          lastname: item.lastname,
          middlename: item.middlename,
          email: item.email,
          contact: item.contact,
          campus: item.campus,
          college: item.college,
          program: item.program,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async editSuperAdminProfile(req: any, res: Response) {
    const { item } = req.body;

    try {
      const id = req.user.superadmin[0].id;
      const response = await prisma.superAdmin.update({
        where: {
          id: id,
        },
        data: {
          firstname: item.firstname,
          lastname: item.lastname,
          middlename: item.middlename,
          email: item.email,
          contact: item.contact,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // update teacher
  static async editTeacherProfile(req: any, res: Response) {
    const { item } = req.body;

    try {
      const id = req.user.teacher[0].id;
      const response = await prisma.teacher.update({
        where: {
          id: id,
        },
        data: {
          firstname: item.firstname,
          lastname: item.lastname,
          middlename: item.middlename,
          email: item.email,
          contact: item.contact,
          campus: item.campus,
          college: item.college,
          program: item.program,
          major: item.major,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // update trainer
  static async EditTrainerProfile(req: any, res: Response) {
    const { item } = req.body;

    try {
      const id = req.user.trainer[0].id;
      const response = await prisma.trainer.update({
        where: {
          id: id,
        },
        data: {
          firstname: item.firstname,
          lastname: item.lastname,
          middlename: item.middlename,
          email: item.email,
          contact: item.contact,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // update trainer
  static async EditStudentProfile(req: any, res: Response) {
    const { item } = req.body;

    try {
      const id = req.user.student[0].id;
      const response = await prisma.student.update({
        where: { id },
        data: {
          firstname: item.firstname,
          lastname: item.lastname,
          middlename: item.middlename,
          email: item.email,
          contact: item.contact,
          gender: item.gender,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // update trainer
  static async EditDirectorProfile(req: any, res: Response) {
    const { item } = req.body;

    try {
      const id = req.user.director[0].id;
      const response = await prisma.director.update({
        where: {
          id: id,
        },
        data: {
          firstname: item.firstname,
          lastname: item.lastname,
          middlename: item.middlename,
          email: item.email,
          contact: item.contact,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }



  // edit timesheet student
  static async EditTimesheet(req:any, res: Response) {
    const {id, timeIn, timeOut, totalHours} = req.body;

    try {
      const response = await prisma.timesheet.update({
        where: {
          id
        },
        data: {
          timeIn,
          timeOut,
          totalHours,
          logStatus: 1
        }
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error)
    }

  }




  // change password
  //student
  static async changeStudentPassword(req: any, res: Response) {
    const { oldPassword, newPassword } = req.body;
    const id = req.user.id;
    try {
      const findAccount = await prisma.user.findFirst({
        where: { id },
      });
      const pass = findAccount?.password ? findAccount?.password : "";

      const passwordVerify = await argon2.verify(pass, oldPassword);
      if (!passwordVerify)
        return res.status(404).json({ message: "wrong password" });

      const response = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: await argon2.hash(newPassword),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // update profile picture

  //update superadmin profile
  static async updateSuperAdminProfilePicture(req: any, res: Response) {
    const id = req.user.superadmin[0]?.id;
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const profile = req.file?.filename;

    const existingFile = await prisma.superAdmin.findUnique({ where: { id } });
    if (!existingFile)
      return res.status(404).json({ message: "teacher not found" });

    if (existingFile?.profile) {
      const filePath = `./public/images/${existingFile.profile}`;
      fs.unlinkSync(filePath);
    }

    try {
      if (req.file) {
        await prisma.superAdmin.update({
          where: { id },
          data: {
            profile_url: url,
            profile,
          },
        });
      }

      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //update teacher profile
  static async updateTeacherProfilePicture(req: any, res: Response) {
    const id = req.user.teacher[0]?.id;
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const profile = req.file?.filename;

    const existingFile = await prisma.teacher.findUnique({ where: { id } });
    if (!existingFile)
      return res.status(404).json({ message: "teacher not found" });

    if (existingFile?.profile) {
      const filePath = `./public/images/${existingFile.profile}`;
      fs.unlinkSync(filePath);
    }

    try {
      if (req.file) {
        await prisma.teacher.update({
          where: { id },
          data: {
            profile_url: url,
            profile,
          },
        });
      }

      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //update coordinator profile
  static async updateCoordinatorProfilePicture(req: any, res: Response) {
    const id = req.user.coordinator[0]?.id;
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const profile = req.file?.filename;

    const existingFile = await prisma.coordinator.findUnique({ where: { id } });
    if (!existingFile)
      return res.status(404).json({ message: "coordinator not found" });

    if (existingFile?.profile) {
      const filePath = `./public/images/${existingFile.profile}`;
      fs.unlinkSync(filePath);
    }

    try {
      if (req.file) {
        await prisma.coordinator.update({
          where: { id },
          data: {
            profile_url: url,
            profile,
          },
        });
      }

      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //update director profile
  static async updateDirectorProfilePicture(req: any, res: Response) {
    const id = req.user.director[0]?.id;
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const profile = req.file?.filename;

    const existingFile = await prisma.director.findUnique({ where: { id } });
    if (!existingFile)
      return res.status(404).json({ message: "director not found" });

    if (existingFile?.profile) {
      const filePath = `./public/images/${existingFile.profile}`;
      fs.unlinkSync(filePath);
    }

    try {
      if (req.file) {
        await prisma.director.update({
          where: { id },
          data: {
            profile_url: url,
            profile,
          },
        });
      }

      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateTrainerProfilePicture(req: any, res: Response) {
    const id = req.user.trainer[0]?.id;
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const profile = req.file?.filename;

    const existingFile = await prisma.trainer.findUnique({ where: { id } });
    if (!existingFile)
      return res.status(404).json({ message: "trainer not found" });

    if (existingFile?.profile) {
      const filePath = `./public/images/${existingFile.profile}`;
      fs.unlinkSync(filePath);
    }

    try {
      if (req.file) {
        await prisma.trainer.update({
          where: { id },
          data: {
            profile_url: url,
            profile,
          },
        });
      }

      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateStudentProfilePicture(req: any, res: Response) {
    const id = req.user.student[0]?.id;
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const profile = req.file?.filename;

    const existingFile = await prisma.student.findUnique({ where: { id } });
    if (!existingFile)
      return res.status(404).json({ message: "student not found" });

    if (existingFile?.profile) {
      const filePath = `./public/images/${existingFile.profile}`;
      fs.unlinkSync(filePath);
    }

    try {
      if (req.file) {
        await prisma.student.update({
          where: { id },
          data: {
            profile_url: url,
            profile,
          },
        });
      } 

      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
 
  // upload task
  static async uploadTask(req: any, res: Response) {
    const id = req.user.student[0]?.id;
    const { description, date } = req.body;
    const tasImageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const taskImage = req.file.filename;

    try {
      const response = await prisma.task.create({
        data: {
          description,
          date,
          taskImage,
          tasImageUrl,
          student_id: id,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async uploadRequirement(req: any, res: Response) {
    const id = req.user.student[0]?.id;
    const { type } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const image = req.file?.filename;

    try {
      const response = await prisma.requirement.create({
        data: {
          type,
          image,
          imageUrl: url,
          student_id: id,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteRequirement(req: any, res: Response) {
    const { id } = req.params;

    try {
      await prisma.requirement.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // add date ranage
  static async addDateRange(req: any, res: Response) {
    const { start_date, end_date } = req.body;
    const teacher_id = req.user.teacher[0]?.id;
    try {
      const response = await prisma.dateRangeTimesheet.create({
        data: {
          start_date,
          end_date,
          teacher_id,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // update date ranage
  static async updateDateRange(req: any, res: Response) {
    const { start_date, end_date } = req.body;
    const teacher_id = req.user.teacher[0]?.id;
    try {
      const response = await prisma.dateRangeTimesheet.updateMany({
        where: {
          teacher_id,
        },
        data: {
          start_date,
          end_date,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // submit rerport
  static async submitReport(req: any, res: Response) {
    const { id, week } = req.body;
    try {
      const response = await prisma.timesheet.updateMany({
        where: {
          AND: [{ student_id: id, week }],
        },
        data: {
          studentMark: 1,
          dateSubmitted: formattedDate,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // submit rerport
  static async teacherAcceptReport(req: any, res: Response) {
    const { id, week, isStatus } = req.body;
    try {
      const response = await prisma.timesheet.updateMany({
        where: {
          AND: [{ student_id: id, week }],
        },
        data: {
          teacherMark: isStatus ? 1 : 0,
          studentMark: isStatus ? 1 : 0,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async trainerAcceptReport(req: any, res: Response) {
    const { id, week, isStatus } = req.body;
    try {
      const response = await prisma.timesheet.updateMany({
        where: {
          AND: [{ student_id: id, week }],
        },
        data: {
          teacherMark: isStatus ? 1 : 0,
          trainerMark: isStatus ? 1 : 0,
          studentMark: isStatus ? 1 : 0,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // add date ranage
  static async getDateRange(req: any, res: Response) {
    const teacher_id = req.user.teacher[0]?.id;
    try {
      const response = await prisma.dateRangeTimesheet.findMany({
        where: { teacher_id },
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // reset all data
  static async resetData(req: any, res: Response) {
    const { id, password } = req.body;
    const passwordDb = req.user.password;

    try {
      const isValidPassword = await argon2.verify(passwordDb, password);
      if (!isValidPassword) {
        return res
          .status(500)
          .json(
            "Incorrect password. Please ensure you've entered the correct password and try again."
          );
      }

      await prisma.student.updateMany({
        where: {
          id: {
            in: id,
          },
        },
        data: { deletedStatus: 1 },
      });
      res.status(200).json(id);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createAnnouncement(req: any, res: Response) {
    const { id, title, description, student_ids, postedBy } = req.body;
    const role = req.user.role;

    try {
      const announcements = await Promise.all(
        student_ids.map(async (student_id: any) => {
          let announcementData: any = {
            title,
            description,
            date: formattedDate,
            postedBy,
            student_id,
          };

          switch (role) {
            case "Coordinator":
              announcementData.coordinator_id = id;
              break;
            case "Teacher":
              announcementData.teacher_id = id;
              break;
            case "Trainer":
              announcementData.trainer_id = id;
              break;
            case "Student":
              announcementData.student_id = student_id;
              break;
            default:
              break;
          }

          const response = await prisma.announcement.create({
            data: announcementData,
          });
          return response;
        })
      );

      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async changeRole(req: any, res: Response) {
    const { id, role } = req.body;
    try {
      const response = await prisma.user.update({
        where: { id },
        data: {
          role,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getNotfication(req: any, res: Response) {
    try {
      const response = await prisma.notification.findMany();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // for fotgot password
  static async verifyEmail(req: any, res: Response) {
    const code = verificationCode();
    const secret_key = process.env.JWT_SECRET_KEY!;

    const email = req.body.email;
    try {
      const findEmail = await prisma.user.findFirst({
        where: { username: email },
      });
      if (!findEmail) {
        return res.status(500).json("not found");
      }

      const mailOptions = {
        from: "reynaldobocaling@gmail.com",
        to: email,
        subject: "IternTrack!",
        text: `Your InternTrack account verification code is: [${code}]. \n\nIf you did not request this code, please ignore this email.\n Thank you, \n Interntrack Support`,
      };

      await transporter.sendMail(mailOptions);

      const token = jwt.sign({ code: code }, "secret_key");
      res.cookie("verificationCode", token);

      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async verifyPin(req: any, res: Response) {
    const pin = req.body.pin;
    const secret_key = process.env.JWT_SECRET_KEY!;

    try {
      const verifyCode = req.cookies.verificationCode;

      if (!verifyCode) {
        return res.status(404).json("not found");
      }
      const decoded: any = jwt.verify(verifyCode, "secret_key");

      if (decoded.code == pin) {
        res.status(200).json(true);
      } else {
        console.log("error");
        res.status(200).json(false);
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  // controller
  static async forgotPassword(req: any, res: Response) {
    const { password, username } = req.body;
    try {
      const response = await prisma.user.updateMany({
        where: { username },
        data: { password: await argon2.hash(password) },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
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

const generateTimeData = (start: any, end: any) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
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
        studentMark:0,
        teacherMark:0,
        trainerMark: 0
      });

      if (timeData.length % 5 === 0) {
        weekCounter++;
      }
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return timeData;
};
