import UserModel from "../model/userModel";
//import { apiCodes } from "utils/apiCodes";

export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email}) 
export const getUserById = (id: string) => UserModel.findById(id)
export const getUserBySssionToken = (sessionToken: string) => UserModel.findOne({
"authentication.sessionToken": sessionToken,
})
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user)=> user.toObject())
export const deleteUser = (id: string) => UserModel.findOneAndDelete({_id: id}) 
export const updateUser = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)
