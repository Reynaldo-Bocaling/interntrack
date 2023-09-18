import { Router } from "express";
import { UserController } from "../controllers/UserController";


const routes = Router();
routes.post('/createStudent', UserController.createStudentAccount);
routes.post('/createDirector', UserController.createDirectorAccount);
export default routes