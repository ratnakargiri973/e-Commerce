import express from 'express';
import { deleteUser, login, logout, register, registerSeller, update } from '../Controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/register-seller', registerSeller);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.put('/update/:id', update);
userRouter.delete('/deleteUser/:id', deleteUser);

export default userRouter;