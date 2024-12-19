import express from 'express';
import { register } from '../Controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/register', register);

export default userRouter;