import { Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken";
const routes = Router();
const uploadMoa = multer({storage:multer.memoryStorage()}).single('pdfFile');

// post
routes.post('/importStudent' ,UserController.importStudent);
routes.post('/addCompany', uploadMoa ,UserController.addCompany);
routes.post('/addTeacher' ,UserController.AddTeacher);
routes.post('/addTrainer' ,UserController.AddTrainer);

// get
routes.get('/getCompany' ,UserController.getCompanyList);
routes.get('/getTrainer' ,UserController.getTrainerList);
routes.get('/getDirector' ,UserController.getDirector);
routes.get('/getTeacher' ,UserController.getTeacher);
routes.get('/getStudentList' ,UserController.getStudentList);
// routes.get('/getId' , verifyToken, UserController.getId);

export default routes   