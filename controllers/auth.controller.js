import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
const  generateToken = (userId)=>{
    return jwt.sign({id : userId} , process.env.JWT_SECRET , {expiresIn : "7d"});
};

export const registerUser = async(req , res) =>{

}

export const loginUser = async(req,res)=>{};

export const getUserProfile = async(req,res)=>{};

export const updateUserProfile = async(req,res)=>{

};

