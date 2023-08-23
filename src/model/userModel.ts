import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  authentication:{
    password: {type: true, required: true, select: false},
    sessionToken:  {type: true, required: true, select: false}
  },
},
{
  timestamps: true
}
)
const UserModel = mongoose.model("User", UserSchema)

export default  UserModel