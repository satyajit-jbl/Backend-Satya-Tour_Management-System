import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../config/env";
import { isActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelpers/AppError";
import httpStatus from 'http-status-codes';

export const createUserTokens = (user: Partial<IUser>)=>{
    const jwtPayload={
            userId: user._id,
            email: user.email,
            role: user.role
        }
        const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_SECRET, envVar.JWT_ACCESS_EXPIRES)
        
        const refreshToken = generateToken(jwtPayload, envVar.JWT_REFRESH_SECRET, envVar.JWT_REFRESH_EXPIRES)

        return {
            accessToken,
            refreshToken
        }
}

export const createNewAccessTokenWithRefreshToken = async(refreshToken: string) =>{
    const verifiedRefreshToken = verifyToken(refreshToken, envVar.JWT_REFRESH_SECRET) as JwtPayload

    const isUserExist = await User.findOne({email: verifiedRefreshToken.email})
    
    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
    }
    
    if(isUserExist.isActive ===isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE){
        throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }

    if(isUserExist.isDeleated){
        throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
    }
 
    const jwtPayload={
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_SECRET, envVar.JWT_ACCESS_EXPIRES)

    return accessToken;
}