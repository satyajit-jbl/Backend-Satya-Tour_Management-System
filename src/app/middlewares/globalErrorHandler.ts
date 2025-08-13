/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { envVar } from "../config/env"
import AppError from "../errorHelpers/AppError";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction)=>{

/**zod error */
/**mongoose error
 * - duplicate
 * - cast error
 * -validation
 */
    console.log(err);

    let statusCode = 500;
    let message= "Something Went wrong !!";
//Duplicate Error
    if(err.code === 11000){
        const matchArray = err.message.match(/"([^"]*)"/)
        statusCode=400;
        message= `${matchArray[1]} already exist`
    } else if(err.name === "CastError"){
        statusCode=400;
        message= "Invalid MongoDb ObjectId, Please provide a valid ID"
    }
    else if(err instanceof AppError){
        statusCode = err.statusCode
        message= err.message
    }else if (err instanceof Error){
        statusCode=500;
        message= err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVar.NODE_ENV ==="development" ? err.stack : null
    })
}