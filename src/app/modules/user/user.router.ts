/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
// import z, { AnyZodObject } from "zod";
import { AnyZodObject } from "zod";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequests";
import AppError from "../../errorHelpers/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./user.interface";



const router = Router();

router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser)
router.get("/all-users", async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const accessToken = req.headers.authorization;

        if(!accessToken){
            throw new AppError(403, "No Token Received")
        }

        const verifiedToken = jwt.verify(accessToken, "secret")

        if(!verifiedToken){
            throw new AppError(403, "You are not authorized")
        }

        if((verifiedToken as JwtPayload).role !== Role.ADMIN){
            throw new AppError(403, "You are not permitted to view this route !!!")
        }

        console.log(verifiedToken);
        next()
    } catch (error) {
        next(error)
    }
}, userControllers.getAllUsers)

export const UserRoutes = router;