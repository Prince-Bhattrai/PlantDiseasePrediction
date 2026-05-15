import { Router } from "express";
import { getCurrUser, logIn, signUp } from "../controllers/user.controllers.js";
import {verifyToken} from "../middlewares/verifyTokrn.js"

const userRouter = Router()

userRouter.post("/signup", signUp)
userRouter.post("/login", logIn)
userRouter.get("/currUser", verifyToken ,getCurrUser)

export default userRouter