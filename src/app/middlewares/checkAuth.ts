import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVar } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { User } from "../modules/user/user.model";
import httpStatus from 'http-status-codes';
import { isActive } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Received")
        }

        const verifiedToken = verifyToken(accessToken, envVar.JWT_ACCESS_SECRET) as JwtPayload
        //from userToken
        const isUserExist = await User.findOne({ email: verifiedToken.email })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
        }

        if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
        }

        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route !!!")
        }

        req.user = verifiedToken
        next()
    } catch (error) {
        next(error)
    }
}