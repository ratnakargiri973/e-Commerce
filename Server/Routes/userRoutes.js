import express from 'express';
import { addToWishlist, deleteUser, editProfile, login, logout, profile, register, registerSeller, removeFromWishlist } from '../Controllers/userControllers.js';
import { protectRoute } from '../Middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/register-seller', registerSeller);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/profile', protectRoute, profile);
userRouter.put('/edit-profile', protectRoute, editProfile);
userRouter.delete('/deleteUser/:id', deleteUser);

userRouter.post('/wishlist/add', protectRoute, addToWishlist);
userRouter.delete("/wishlist/remove/:id", protectRoute, removeFromWishlist);


export default userRouter;