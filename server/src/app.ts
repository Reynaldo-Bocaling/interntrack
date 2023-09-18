import express, { Response } from 'express';
import cookieParser from 'cookie-parser';
import UserRoutes from './routes/UserRoute'
import verifyToken from './middlewares/verifyToken';
import { Login } from './utils/auth';
class App {
    public server;

    constructor() {
        this.server = express()
        
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express.json());
        this.server.use(cookieParser());
        this.server.get('/verify', verifyToken, (req:any, res:Response) => {
            res.json(req.user)
        });
       
    }
    routes() {
        this.server.use('/', UserRoutes);
        this.server.use('/auth', Login);
    }
}

export default new App().server;