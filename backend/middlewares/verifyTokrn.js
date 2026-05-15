import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Autheader missing"
        })
    }
    if (!authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            message: "Invalid token format"
        })
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Unauthorized!"
        })
    }
}