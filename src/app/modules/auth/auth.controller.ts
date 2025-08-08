/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.services';
import AppError from '../../errorHelpers/AppError';
import { setAuthCookie } from '../../utils/setCookie';


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false,
    // })
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })
    setAuthCookie(res, loginInfo)


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Refresh Token Rcceived from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false,
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: tokenInfo
    })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
}