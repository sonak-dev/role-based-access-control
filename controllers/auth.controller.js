import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";


export const register = async (req, res, next) => {

    try{

        const { username, password, role } = req.body;

        if(!username || !password || !role){
            const error = new Error("All fields are required: username, password, and role.");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ username });

        if(user){
            const error = new Error("Username already exists.");
            error.statusCode = 400;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            password: hashPassword,
            role
        });

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: {
                newUser
            }
        });

    }catch(err){
        next(err);
    }

}


export const login = async (req, res, next) => {

    try{

        const { username, password } = req.body;

        if (!username || !password) {
            const error = new Error("Username and password are required.");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ username });

        if (!user) {
            const error = new Error("User not found. Please register first.");
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error("Invalid password.");
            error.statusCode = 401;
            throw error;
        }

        const token = await jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        )

        res.status(201).json({
            success: true,
            message: "Logins successfully",
            data: {
                token,
                user
            }
        });

    }catch(err){
        next(err);
    }

}