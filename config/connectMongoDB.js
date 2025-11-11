import mongoose from "mongoose";
import { DB_URI } from "./env.js";


const connectToDatabase = async () => {

    try{
        const connect = await mongoose.connect(DB_URI);
        console.log(`✅ Database connected : ${connect.connection.host}, ${connect.connection.name}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }

}

export default connectToDatabase;