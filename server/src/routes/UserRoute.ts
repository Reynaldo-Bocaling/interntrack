import { Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken";
const routes = Router();
const uploadMoa = multer({storage:multer.memoryStorage()}).single('pdfFile');
const importStudents = multer({storage:multer.memoryStorage()}).single('excelFile');

routes.post('/addManyStudent', importStudents ,UserController.addManyStudent);
routes.post('/addCompany', uploadMoa ,UserController.addCompany);
routes.post('/addTeacher' ,UserController.AddTeacherAccount);
routes.post('/addTrainer' ,UserController.AddTrainerAccount);
routes.get('/getCompanyList' ,UserController.getCompanyList);
routes.get('/getTrainerList' ,UserController.getTrainerList);
routes.get('/getId' , verifyToken, UserController.getId);

export default routes   