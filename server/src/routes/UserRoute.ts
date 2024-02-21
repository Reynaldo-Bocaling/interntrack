import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken";
import verifyCode from "../middlewares/verifyCode";

import path from "path";
const routes = Router();
const uploadMoa = multer({storage:multer.memoryStorage()}).single('pdfFile');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: ( req, file, cb) => {
       cb(null, Date.now() + path.extname(file.originalname))
    }
});

const uploads = multer({storage: storage})


// try
routes.get("/", (req:Request, res: Response) => {
    res.send("test")
})

// post
routes.post('/importStudent' ,verifyToken, UserController.importStudent);
routes.post('/addCompany', uploads.single('pdfFile') , verifyToken , UserController.addCompany);
routes.post('/addSuperAdmin' ,UserController.addSuperAdmin);
routes.post('/addDirector' ,UserController.addDirector);
routes.post('/AddCoordinator' ,verifyToken, UserController.AddCoordinator);
routes.post('/PromoteAsCoordinator', UserController.PromoteAsCoordinator);
routes.post('/addTeacher' ,verifyToken ,UserController.AddTeacher);
routes.post('/addTrainer' , verifyToken ,UserController.AddTrainer);
routes.post('/addStudent' ,verifyToken,UserController.addSingleStudent);
routes.post('/verifyEmail' ,UserController.verifyEmail);

// campuses
routes.post('/addCampus' ,UserController.addCampus);
routes.post('/addCollege' ,UserController.addCollege);
routes.post('/addProgram' ,UserController.addProgram);
routes.post('/addMajor' ,UserController.addMajor);

//campuses delete
routes.delete('/deleteCampus/:id' ,UserController.deleteCampus);
routes.delete('/deleteCollege/:id' ,UserController.deleteCollege);
routes.delete('/deleteProgram/:id' ,UserController.deleteProgram);
routes.delete('/deleteMajor/:id' ,UserController.deleteMajor);
routes.delete('/deleteRequirement/:id' ,UserController.deleteRequirement);


//update campuses
routes.put('/updateCampus' ,UserController.updateCampus);
routes.put('/updateCollege' ,UserController.updateCollege);
routes.put('/updateProgram' ,UserController.updateProgram);
routes.put('/updateMajor' ,UserController.updateMajor);
routes.put('/updateAreaSlot' ,UserController.updateAreaSlot);


// date range routes
routes.post('/addDateRange' ,verifyToken,UserController.addDateRange);
routes.put('/updateDateRange' ,verifyToken,UserController.updateDateRange);
routes.get('/getDateRange' ,verifyToken,UserController.getDateRange);



routes.put('/assignStudent' ,UserController.assignStudent);
routes.put('/attendanceRequest' ,UserController.attendanceRequest);
routes.put('/timeIn' ,UserController.timeIn);
routes.put('/timeOut' ,UserController.timeOut);



// get user info
routes.get('/getCompanyList' ,UserController.getCompanyList);
routes.get('/getTrainerList' ,UserController.getTrainerList);
routes.get('/getSuperAdmin' , verifyToken,UserController.getSuperAdmin);
routes.get('/getCoordinatorList' ,UserController.getCoordinatorList);
routes.get('/getDirector',verifyToken ,UserController.getDirector);
routes.get('/getTeacherList' ,UserController.getTeacherList);
routes.get('/getDirectorList' ,UserController.getDirectorList);
routes.get('/getTeacher' ,verifyToken ,UserController.getTeacher);
routes.get('/getCoordinator' ,verifyToken, UserController.getCoordinator);
routes.get('/getTrainer' ,verifyToken, UserController.getTrainer);
routes.get('/getStudentList',UserController.getStudentList);
routes.get('/getAdminList',UserController.getAdminList);
routes.get('/getStudent' ,verifyToken, UserController.getStudent);
routes.get('/getStudentInfo/:id' ,UserController.getStudentInfo);
routes.get('/getCampus' ,UserController.getCampus);
routes.get('/getRequirement' ,verifyToken,UserController.getRequirement);
routes.get('/getTask' ,verifyToken,UserController.getTask);
routes.get('/getAnnouncement' ,UserController.getAnnouncement);





// edit profile
routes.put('/editSuperAdminProfile' ,verifyToken,UserController.editSuperAdminProfile);
routes.put('/editProfileCoordinator' ,verifyToken,UserController.EditCoordinatorProfile);
routes.put('/editProfileTeacher' ,verifyToken, UserController.editTeacherProfile);
routes.put('/editProfileTrainer' ,verifyToken,UserController.EditTrainerProfile);
routes.put('/editProfileDirector' ,verifyToken,UserController.EditDirectorProfile);
routes.put('/editProfileStudent' ,verifyToken,UserController.EditStudentProfile);
routes.put('/EditTimesheet',UserController.EditTimesheet);






//change password
//student
routes.put('/changeStudentPassword' ,verifyToken,UserController.changeStudentPassword);



//submit report
routes.put('/submitReport',UserController.submitReport);
routes.put('/teacherAcceptReport',UserController.teacherAcceptReport);
routes.put('/trainerAcceptReport',UserController.trainerAcceptReport);



// 


// update profile
routes.put('/updateTeacherProfilePicture' ,verifyToken, uploads.single('image'), UserController.updateTeacherProfilePicture);
routes.put('/updateSuperAdminProfilePicture' ,verifyToken, uploads.single('image'), UserController.updateSuperAdminProfilePicture);
routes.put('/updateCoordinatorProfilePicture' ,verifyToken, uploads.single('image'), UserController.updateCoordinatorProfilePicture);
routes.put('/updateDirectorProfilePicture' ,verifyToken, uploads.single('image'), UserController.updateDirectorProfilePicture);
routes.put('/updateTrainerProfilePicture' ,verifyToken, uploads.single('image'), UserController.updateTrainerProfilePicture);
routes.put('/updateStudentProfilePicture' ,verifyToken, uploads.single('image'), UserController.updateStudentProfilePicture);
routes.put('/changeRole' , UserController.changeRole);





// get student records timesheet/task
routes.get('/getTimesheet' ,verifyToken,UserController.getTimesheet);




// upload task
routes.post('/uploadTask' ,verifyToken, uploads.single('image'), UserController.uploadTask);
routes.post('/uploadRequirement' ,verifyToken, uploads.single('image'), UserController.uploadRequirement);




// reset data
routes.put('/resetData' ,verifyToken, UserController.resetData);



// announcement
routes.post('/createAnnouncement', verifyToken, UserController.createAnnouncement)


// get user
routes.get('/getUser', verifyToken, (req:any, res:Response) => {res.json(req.user)})

routes.get('/getNotfication', UserController.getNotfication)


// FORGOT PASSWORD

routes.post('/verifyPin', UserController.verifyPin)
routes.put('/forgotPassword', UserController.forgotPassword)


// logout
routes.post('/logout', (req:any, res:Response)=> {
    try {
        res.clearCookie('token');
    res.json({message: 'LoggedOut'})
    } catch (error:any) {
        throw new Error(error)
    }
})

export default routes   