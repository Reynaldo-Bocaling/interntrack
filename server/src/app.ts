import express from 'express';
import cookieParser from 'cookie-parser';
import teacher from './routes/teacher.route'
import student from './routes/student.route'
import auth from './routes/auth.route'

class App {
    public server;

    constructor() {
        this.server = express()
        
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express.json())
        this.server.use(cookieParser())
    }
    routes() {
        this.server.use('/teacher', teacher)
        this.server.use('/teacher', student)
        this.server.use('/auth', auth)
    }
}

export default new App().server;