import express from 'express'
import { verifyToken } from '../Controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/verify-token', verifyToken);


export default authRouter;