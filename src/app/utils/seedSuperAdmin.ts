
import { envVar } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import bcryptjs from "bcryptjs";

import { User } from '../modules/user/user.model';

export const seedSuperAdmin = async () =>{
    try {
        const isSuperAdminExist = await User.findOne({email: envVar.SUPER_ADMIN_EMAIL})

        if(isSuperAdminExist){
            console.log("Super Admin Already Exists");
            return;
        }

        console.log("Trying to create Super Admin...");

        const hashedPassword = await bcryptjs.hash(envVar.SUPER_ADMIN_PASSWORD, Number(envVar.BCRYPT_SALT_ROUND));

        const authProvider : IAuthProvider = {
            provider: "credentials",
            providerId: envVar.SUPER_ADMIN_EMAIL
        } 

        const payload: IUser = {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email: envVar.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auths: [authProvider]
            
        }
        const superAdmin = await User.create(payload)

        console.log("Super Admin Created Successfuly! \n");
        console.log(superAdmin);
    } catch (error) {
        console.log(error);
    }
}