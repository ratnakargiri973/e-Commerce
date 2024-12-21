import express from 'express'
import { validateToken, verifyToken } from '../Controllers/authController.js';
import { protectRoute } from '../Middlewares/auth.js';

const authRouter = express.Router();

authRouter.post('/verify-token', verifyToken);

authRouter.get('/validate-token', validateToken);

authRouter.get("/check", protectRoute, (req, res) => {
    res.status(200).send({user: req.user, isAuthenticated: true});
});


export default authRouter;