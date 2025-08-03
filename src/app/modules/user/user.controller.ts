/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes"

const createUser = async (req: Request, res: Response)=>{
    try {
        const {name, email}= req.body;
        const user = await User.create({
            name,
            email
        })

        res.status(httpStatus.CREATED).json({
            message: "User Created Successfully",
            user
        });
    } catch (err: any) {
        console.log(err);
        res.status(httpStatus.BAD_REQUEST).json({
            message: `Something went wrong !! ${err.message}`
        })

    }
}

export const userControllers = {
    createUser
}