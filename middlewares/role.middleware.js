// ✅ Middleware: Check Role (Authorization)
export const authorizeRole = (...allowedRoles) => {
    // ✅ Middleware factory return hota hai (dynamic roles ke liye)
    return (req, res, next) => {

        // ✅ req.user.role → verifyToken middleware se milta hai
        // ✅ Check if the logged-in user's role exists inside allowedRoles array
        if (!allowedRoles.includes(req.user.role)) {
            // ❌ Agar user ka role match nahi kar raha → forbidden
            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission."
            });
        }

        next(); // ✅ Role allowed hai → next middleware/handler run hoga
    };

}