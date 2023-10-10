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



// get user info
routes.get('/getCompanyList' ,UserController.getCompanyList);
routes.get('/getTrainerList' ,UserController.getTrainerList);
routes.get('/getDirector' ,UserController.getDirector);
routes.get('/getTeacher' ,UserController.getTeacher);
routes.get('/getStudent' ,UserController.getStudent);
routes.get('/getCoordinator' ,UserController.getCoordinator);
routes.get('/getTrainer' ,UserController.getTrainer);
routes.get('/getCampus' ,UserController.getCampus);
routes.get('/getStudentList' ,UserController.getStudentList);
routes.get('/getStudentInfo/:id' ,UserController.getStudentInfo);

export default routes   