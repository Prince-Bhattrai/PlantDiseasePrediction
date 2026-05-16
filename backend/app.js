import express from "express";
import dotev from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import historyRouter from "./routes/history.routes.js"; 


dotev.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


app.use("/v1/api/user", userRouter)
app.use("/v1/api/history", historyRouter)

export default app;