import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

const credentialsLogin = async(payload: Partial<IUser>)=>{
    const {email, password} = payload;

    const isUserExist = await User.findOne({email})
    
    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
    }
    const ispasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if(!ispasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const jwtPayload={
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = jwt.sign(jwtPayload, "secret",{
        expiresIn: "1d",

    })

    return{
        accessToken
    }
}

export const AuthServices ={
    credentialsLogin
}