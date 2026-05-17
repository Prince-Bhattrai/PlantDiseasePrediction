import { Router } from "express";
import {
    changePassword,
    getCurrUser,
    googleAuth,
    logIn,
    signUp,
    userSetting
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/verifyTokrn.js"

const userRouter = Router()

userRouter.post("/signup", signUp)
userRouter.post("/login", logIn)
userRouter.get("/currUser", verifyToken, getCurrUser)
userRouter.put("/setting", verifyToken, userSetting)
userRouter.post("/googleAuth", googleAuth)
userRouter.put("/password", verifyToken, changePassword)
export default userRouter