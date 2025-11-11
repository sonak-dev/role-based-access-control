import express from "express";

// ✅ PORT yaha se load hoga (environment se)
import { PORT } from "./config/env.js";

// Routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

// ✅ Database connection function yaha import hoga
import connectToDatabase from "./config/connectMongoDB.js";


const app = express();


// ✅ Middleware (saare middlewares yaha use honge)
app.use(express.json()); // JSON parse middleware


// Routes
app.use(`/api/auth`, authRoute);
app.use(`/api/users`, userRoute);


// ✅ Start the server (server yaha start hoga)
app.listen(PORT, async () => {
    // ✅ Connect Database (DB yaha connect hoga)
    await connectToDatabase();
  console.log(`Server running on http://localhost:${PORT}`);
});
