import express, { Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserRoutes from './routes/UserRoute'
import verifyToken from './middlewares/verifyToken';
import  Login  from './utils/auth';
class App {
    public server;

    constructor() {
        this.server = express()
        
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express.json());
        this.server.use(cors({
            origin: 'http://localhost:5173',
            methods: ['POST', 'GET', 'DELETE', 'PATCH'],
            credentials: true 
        }));
        this.server.use(cookieParser());
        this.server.get('/verify', verifyToken, (req:any, res:Response) => {
            res.json(req.user.role)
        });
       
    }
    routes() {
        this.server.use('/', UserRoutes);
        this.server.use('/auth', Login);
    }
}

export default new App().server;