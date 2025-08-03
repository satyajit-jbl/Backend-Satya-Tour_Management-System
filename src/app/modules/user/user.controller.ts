/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserService } from "./user.service";


const createUser = async (req: Request, res: Response, next: NextFunction)=>{
    
    try {
    //    throw new Error("Fake Error")
    //    throw new AppError(httpStatus.BAD_REQUEST, "Fake Error")
        const user = await UserService.createUser(req.body)

        res.status(httpStatus.CREATED).json({
            message: "User Created Successfully",
            user
        });
    } catch (err: any) {
        console.log(err);
        next(err)

    }
}

export const userControllers = {
    createUser
}

//route matching(app-routes-user.routes) -> controller=>service=>model=db
//workflow--- create interface and model - service - controller - route