import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken";
const routes = Router();
const uploadMoa = multer({storage:multer.memoryStorage()}).single('pdfFile');

// post
routes.post('/importStudent' ,verifyToken, UserController.importStudent);
routes.post('/addCompany', uploadMoa ,UserController.addCompany);
routes.post('/addSuperAdmin' ,UserController.addSuperAdmin);
routes.post('/addDirector' ,UserController.addDirector);
routes.post('/AddCoordinator' ,verifyToken, UserController.AddCoordinator);
routes.post('/addTeacher' ,verifyToken ,UserController.AddTeacher);
routes.post('/addTrainer' ,UserController.AddTrainer);
routes.put('/assignStudent' ,UserController.assignStudent);
routes.put('/attendanceRequest' ,UserController.attendanceRequest);
routes.put('/timeIn' ,UserController.timeIn);
routes.put('/timeOut' ,UserController.timeOut);



// get user info
routes.get('/getCompanyList' ,UserController.getCompanyList);
routes.get('/getTrainerList' ,UserController.getTrainerList);
routes.get('/getCoordinatorList' ,UserController.getCoordinatorList);
routes.get('/getDirector',verifyToken ,UserController.getDirector);
routes.get('/getTeacherList' ,UserController.getTeacherList);
routes.get('/getDirectorList' ,UserController.getDirectorList);
routes.get('/getTeacher' ,verifyToken ,UserController.getTeacher);
routes.get('/getCoordinator' ,verifyToken, UserController.getCoordinator);
routes.get('/getTrainer' ,verifyToken, UserController.getTrainer);
routes.get('/getStudentList',UserController.getStudentList);
routes.get('/getStudent' ,verifyToken, UserController.getStudent);
routes.get('/getStudentInfo/:id' ,UserController.getStudentInfo);
routes.get('/getCampus' ,UserController.getCampus);




// get student records timesheet/task
routes.get('/getTimesheet' ,verifyToken,UserController.getTimesheet);


export default routes   