import { Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken";
const routes = Router();
const uploadMoa = multer({storage:multer.memoryStorage()}).single('pdfFile');

// post
routes.post('/importStudent' ,UserController.importStudent);
routes.post('/addCompany', uploadMoa ,UserController.addCompany);
routes.post('/AddCoordinator' ,UserController.AddCoordinator);
routes.post('/addTeacher' ,UserController.AddTeacher);
routes.post('/addTrainer' ,UserController.AddTrainer);
routes.put('/assignStudent' ,UserController.assignStudent);
routes.put('/attendanceRequest' ,UserController.attendanceRequest);



// get user info
routes.get('/getCompanyList' ,UserController.getCompanyList);
routes.get('/getTrainerList' ,UserController.getTrainerList);
routes.get('/getDirector',verifyToken ,UserController.getDirector);
routes.get('/getTeacher' ,verifyToken ,UserController.getTeacher);
routes.get('/getCoordinator' ,verifyToken, UserController.getCoordinator);
routes.get('/getTrainer' ,verifyToken, UserController.getTrainer);
routes.get('/getStudentList' , verifyToken,UserController.getStudentList);
routes.get('/getStudent' ,verifyToken, UserController.getStudent);
routes.get('/getStudentInfo/:id' ,UserController.getStudentInfo);
routes.get('/getCampus' ,UserController.getCampus);

export default routes   