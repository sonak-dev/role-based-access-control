import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const userRoute = Router();


// ✅ ADMIN ONLY ROUTE
// Example: Admin ko users ki list ya system overview milta hai
userRoute.get("/admin-data",
    verifyToken,
    authorizeRole("admin"),
    (req, res) => {
        res.json({
            message: "Welcome Admin",
            yourRole: req.user.role,
            yourUserName: req.user.username,
            adminDashboard: {
                totalUsers: 83,
                activeManagers: 12,
                systemHealth: "Running",
                secretAdminNote: "Only admin can see this"
            }
        });
    }
);



// ✅ ADMIN + MANAGER ROUTE
// Example: Manager ko team data aur operational info milta hai
userRoute.get("/manager-data",
    verifyToken,
    authorizeRole("admin", "manager"),
    (req, res) => {
        res.json({
            message: "Welcome Manager",
            yourRole: req.user.role,
            yourUserName: req.user.username,
            teamReports: {
                pendingTasks: 17,
                completedTasks: 40,
                usersUnderYou: ["User A", "User B", "User C"]
            }
        });
    }
);



// ✅ ALL ROLES CAN ACCESS
// Example: Normal user apne profile aur basic info dekh sakta hai
userRoute.get("/user-data",
    verifyToken,
    authorizeRole("admin", "manager", "user"),
    (req, res) => {
        res.json({
            message: "Welcome User",
            userProfile: {
                id: req.user._id,
                username: req.user.username,
                role: req.user.role,
                joinedAt: req.user.createdAt
            },
            notice: "This data is visible to all logged-in users."
        });
    }
);

export default userRoute;
