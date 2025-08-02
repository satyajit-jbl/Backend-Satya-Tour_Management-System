import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN="SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE",

}

//auth providers
//email password, google auth, 

export interface IAuthProvider {
    provider: string, //Google, credential
    providerId: string,

}

export enum isActive{
    ACTIVE= "ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED= "BLOCKED"
}

export interface IUser{
    name: string; 
    email: string;
    password ?: string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDeleated ?: string;
    isActive ?: isActive;
    isVerified ?: string;

    role: Role;
    auths: IAuthProvider[];
    bookings ?: Types.ObjectId[];
    guides ?: Types.ObjectId[];
}