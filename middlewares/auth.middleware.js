import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";


// ✅ Middleware: Verify Token (Authenticate User)
export const verifyToken = async (req, res, next) => {

    try {

        let token;

        // ✅ Token header se nikalna (Authorization: Bearer <token>)
        let authHeader = req.headers.authorization;

        // ✅ Check if header exists and starts with 'Bearer'
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];   // ✅ Token extract
        }

        // ✅ No token → user unauthorized
        if (!token) {
            const error = new Error("No token provided. Authorization denied.");
            error.statusCode = 401;
            throw error;
        }

        // ✅ Verify JWT token (decode user id + role)
        const decode = jwt.verify(token, JWT_SECRET);

        // ✅ Fetch user details from DB (exclude password)
        const user = await User.findById(decode.id).select("-password");

        // ✅ If user not found → token invalid
        if (!user) {
            const error = new Error("User does not exist.");
            error.statusCode = 404;
            throw error;
        }

        // ✅ Attach user to request → next middleware/route use karega
        req.user = user;

        console.log("✅ User verified:", user);

        next(); // ✅ Continue to next middleware

    } catch (err) {
        next(err); // ✅ Send error to global error handler
    }

};