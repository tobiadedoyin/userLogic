import mongoose from "mongoose"

export interface IUser {
  username: string,
  email: string,
  password: string
  authentication: any
}

const UserSchema = new mongoose.Schema<IUser>({
  username:{
    type: String,
    required: true,
    set: (value: string) => value.toLowerCase().trim()
  },
  email:{
    type: String,
    required: true,
    unique: true,
    set: (value: string) => value.toLowerCase().trim()
  },
  authentication:{
    password: {type: String, required: true, select: false},
    salt:{type:String, select: false},
    sessionToken:  {type: String,  select: false}
  },
},
{
  timestamps: true
}
)
const UserModel = mongoose.model<IUser>("User", UserSchema)

export default  UserModel