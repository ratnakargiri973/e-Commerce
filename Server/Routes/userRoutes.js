import express from 'express';
import { deleteUser, editProfile, login, logout, profile, register, registerSeller } from '../Controllers/userControllers.js';
import { protectRoute } from '../Middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/register-seller', registerSeller);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/profile', protectRoute, profile);
userRouter.put('/edit-profile', protectRoute, editProfile);
userRouter.delete('/deleteUser/:id', deleteUser);

export default userRouter;