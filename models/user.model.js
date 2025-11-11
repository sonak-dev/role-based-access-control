import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["admin", "manager", "user"]
    }

}, { timestamps: true } );


const User = mongoose.model("user", userSchema);

export default User;