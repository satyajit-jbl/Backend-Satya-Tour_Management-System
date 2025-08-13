/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";

import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from "bcryptjs"
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../../config/env";


// const credentialsLogin = async (payload: Partial<IUser>) => {
//     const { email, password } = payload;

//     const isUserExist = await User.findOne({ email })

//     if (!isUserExist) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
//     }
//     const ispasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

//     if (!ispasswordMatched) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
//     }

//     // const jwtPayload={
//     //     userId: isUserExist._id,
//     //     email: isUserExist.email,
//     //     role: isUserExist.role
//     // }
//     // const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_SECRET, envVar.JWT_ACCESS_EXPIRES)

//     // const refreshToken = generateToken(jwtPayload, envVar.JWT_REFRESH_SECRET, envVar.JWT_REFRESH_EXPIRES)

//     const userTokens = createUserTokens(isUserExist)

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password: pass, ...rest } = isUserExist.toObject();

//     return {
//         accessToken: userTokens.accessToken,
//         refreshToken: userTokens.refreshToken,
//         user: rest
//     }
// }

const getNewAccessToken = async (refreshToken: string) => {

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }
}
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    const isOldPassword = await bcryptjs.compare(oldPassword, user!.password as string)

    if (!isOldPassword) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match")
    }
    //new password saved in user then saved it
    user!.password = await bcryptjs.hash(newPassword, Number(envVar.BCRYPT_SALT_ROUND))

    user!.save();
}

export const AuthServices = {
    // credentialsLogin,
    getNewAccessToken,
    resetPassword
}