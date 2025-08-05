/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserService } from "./user.service";
import { TextEncoderStream } from "stream/web";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


// const createUser = async (req: Request, res: Response, next: NextFunction)=>{ 
//     try {
//     //    throw new Error("Fake Error")
//     //    throw new AppError(httpStatus.BAD_REQUEST, "Fake Error")
//         const user = await UserService.createUser(req.body)
//         res.status(httpStatus.CREATED).json({
//             message: "User Created Successfully",
//             user
//         });
//     } catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user
    })
    // res.status(httpStatus.CREATED).json({
    //     message: "User created Successfully",
    //     user
    // })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrived Successfully",
        data: result.data,
        meta: result.meta
        
    })
    
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "User retrived successfully",
    //     data: users
    // })


})

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await UserService.getAllUsers();
//         return users;
//     } catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }

//function =>(try-cathch layer)=> req-res function return

export const userControllers = {
    createUser,
    getAllUsers
}

//route matching(app-routes-user.routes) -> controller=>service=>model=db
//workflow--- create interface and model - service - controller - route