import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "../utils/verification.js";


export const register = async (req, res) => {
    const {name, email, username, phone} = req.body;
    try {
        const existingUsername = await userModel.findOne({username});
        
        if(existingUsername) return res.status(400).send({message: `Username ${username} exists`});

        const existingEmail = await userModel.findOne({email});
        
        if(existingEmail) return res.status(400).send({message: "Given Email address exists. Please try to register with another email"});

        const password = await bcrypt.hash(req.body.password, 10);

        const newUser = new userModel({
            name,
            email,
            username,
            password,
            phone
        });

        await newUser.save();

        await sendVerificationEmail(newUser._id, newUser.email);

        res.status(201).send({message:"User registered successfully"});
    } catch (error) {
        res.status(500).send({ message: "Error registering user", error: error.message });
    }
}