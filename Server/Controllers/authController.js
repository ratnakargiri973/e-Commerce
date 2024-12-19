import  jwt from "jsonwebtoken";
import 'dotenv/config';
import userModel from "../Models/userModel.js";


export const verifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await userModel.findOneAndUpdate(
            {email: decoded.userEmail}, 
            {isEmailVerified: true});

            if(!user) return res.status(404).send({message: "User not found"});

            res.status(200).send({message: "Email verified successfully"});

    } catch (error) {
        res.status(500).send({error: error});
    }
}