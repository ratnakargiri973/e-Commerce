import mongoose from "mongoose";
import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "../utils/verification.js";
import jwt from 'jsonwebtoken';


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

export const registerSeller = async (req, res) => {
    const { name, username, email, phone } = req.body;
  
    try {
      const existingUsername = await userModel.findOne({ username });
      if (existingUsername) {
        return res.status(400).send({ message: `Username ${username} exists` });
      }
  
     
      const existingEmail = await userModel.findOne({ email });

  
      if (existingEmail && existingEmail.role === "seller") {
        return res.status(400).send({ message: `You are already a seller` });
      }
  
      if (existingEmail) {
        await userModel.findOneAndUpdate({ email }, { role: "seller" });
        await userModel.findOneAndUpdate({ email }, {username: username});

        return res.status(200).send({ message: `Your status is now elevated to a seller` });
      } else {
        
        const password = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new userModel({
          name,
          username,
          email,
          phone,
          password,
          role: "seller",
        });
  
        
        await newUser.save();
  
       
        await sendVerificationEmail(newUser._id, newUser.email);
  
        return res.status(201).send({ message: "Seller registered" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error registering user", error: error.message });
    }
  };
  

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await userModel.findOne({username});

        if(!user){
            return res.status(401).send({message: "Incorrect credentials"});
        }
        
        if(!user.isEmailVerified){
            return res.status(403).send({message: "please verify your email before logging in"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).send({message: "Incorrect credentials"});
        }

        const token = jwt.sign(
        {
           userId: user._id,
           username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
     );

       res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
       });

       const loggedInUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        username: user.username,
      };

    return res.status(200).send({message: "User has logged in successfully", loggedInUser});


    } catch (error) {
        res.status(500).send({message: "Error logging in user", error: error.message});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).send({message: "User logged out successfully"});
}

export const update = async (req, res) => {
    const {id} = req.params;

    const {name, email, username, phone, password, role} = req.body;

    try {
        if(!id){
            return res.status(400).send({message: "You must specify a User ID"});
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message: "Given ID is not in proper format"});
        }

        const updateToUser = await userModel.findByIdAndUpdate(id, {
            name,
            email,
            username,
            password,
            phone,
            role
        });

        if(!updateToUser){
            return res.status(404).send({message: "No user is found with that ID"});
           };
    
           res.status(200).send({message: "Updated Successfully", updateToUser});
        }
        catch(err){
            res.status(500).send({message: "Error in updating user", err});
        }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
       if(!id){
           return res.status(400).send({message: "You must specify a User ID"})
       }
   
       if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).send({message: "The user ID is not in proper format"});
       }
   
       const deletedUser = await userModel.findByIdAndDelete(id);
   
       if (!deletedUser)
           return response
             .status(404)
             .send({ message: "No user found with the given ID" });
     
         res.send({ message: "User with the given ID deleted" });
    } catch (error) {
         res.status(500).send({message: "Error deleting user", error});
    }
}