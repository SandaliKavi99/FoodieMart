import { Router } from "express";
import jwt from "jsonwebtoken";
import { sample_users } from "../data";
import asynceHandler from 'express-async-handler';
import { UserModel } from "../models/user.modules";
import bcrypt from "bcrypt";

const router = Router();
const SALT_ROUNDS = 10;

router.get("/seed", asynceHandler(
    async (req, res) =>{
        const userCount = await UserModel.countDocuments();
        if(userCount>0){
            res.send("Seed is already done");
            return;
        }
        await UserModel.create(sample_users);
        res.send("seed is done");
    }
))

router.post("/login", asynceHandler(
    async (req,res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send({ token: generateTokenResponse(user), userDetails: { email: user.email, isAdmin: user.isAdmin } });
        } 
        else {
            res.status(400).send("Username or password is not valid");
        }
    }
)
)

router.post("/signUp", asynceHandler(
    async (req,res) => {
        const {email, password} = req.body;
        const users = await UserModel.find();
        const userExist = users.find(user => user.email===email);
        if(userExist){
            res.status(400).send("Email already exist!");
        }
        else{
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const user = await UserModel.create({
                ...req.body,
                password: hashedPassword,
              });
            if(user){
                res.send({ token: generateTokenResponse(user) });
            }
        }
    }
)
)

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin},
        "88a6c5019bf3094b59af48184ea7accb723c077969345b97dcb97799aab37ce3eeb5dc5c29be05ee5c6a271fa4a8d2bc5d4741539ad47912da535a3e3e7f61e1",{
            expiresIn:"30d"
        }
    );
    return token;
}



export default router;