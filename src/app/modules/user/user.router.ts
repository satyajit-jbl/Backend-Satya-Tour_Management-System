/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
// import z, { AnyZodObject } from "zod";
import { AnyZodObject, object } from "zod";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequests";
import AppError from "../../errorHelpers/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVar } from "../../config/env";
import { checkAuth } from "../../middlewares/checkAuth";
import { AuthControllers } from "../auth/auth.controller";



const router = Router();



router.post("/register", 
    // validateRequest(createUserZodSchema), 
    userControllers.createUser)
router.get("/all-users",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getAllUsers)
router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), userControllers.updateUser)

export const UserRoutes = router;