import { IUser } from "./user.interface";
import { User } from "./user.model";


const createUser = async (payload: Partial<IUser>) => {
    const { name, email } = payload;
    const user = await User.create({
        name,
        email
    })

    return user;
}

const getAllUsers = async () => {
    const users = User.find({})

    return users;
}

export const UserService = {
    createUser,
    getAllUsers
}