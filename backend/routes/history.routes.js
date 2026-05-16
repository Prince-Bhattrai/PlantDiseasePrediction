import { Router } from "express";
import upload from "../middlewares/multerMiddleware.js";
import { deleteHistory, getHistory, getProfileInfo, predict } from "../controllers/historyController.js";
import {verifyToken} from "../middlewares/verifyTokrn.js"

const historyRouter = Router()

historyRouter.post("/predict", verifyToken ,upload.single("image"), predict)
historyRouter.get("/get", verifyToken, getHistory)
historyRouter.delete("/delete/:id", verifyToken, deleteHistory)
historyRouter.get("/profile-info", verifyToken, getProfileInfo)

export default historyRouter