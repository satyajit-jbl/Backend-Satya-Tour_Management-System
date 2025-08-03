
import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import { router } from "./app/routes";
import { success } from "zod";
import { envVar } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";


const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/v1", router)

app.get("/", (req: Request, res: Response)=>{
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})

//global error handler
app.use(globalErrorHandler)

export default app

