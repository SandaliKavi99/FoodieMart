import { model, Schema } from "mongoose";

export interface User{
    id:string;
    email:string;
    address:string;
    isAdmin:boolean;
    name: any;
}

export const UserSchema = new Schema<User>(
    {
      name:{type: String, required:true},
      email:{type: String, required:true},
      address:{type: String, required:true},
      isAdmin:{type: Boolean, required:false},
      
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const UserModel = model<User>('user',UserSchema);