import { Router } from "express";
import jwt from "jsonwebtoken";
import { sample_users } from "../data";
import asynceHandler from 'express-async-handler';
import { UserModel } from "../models/user.modules";

const router = Router();

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

router.post("/login", (req,res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);

    if(user){
        res.send(generateTokenResponse(user));
    }
    else{
        res.status(400).send("Username or password in not valid");
    }
})

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin},
        "SomeRandomText",{
            expiresIn:"30d"
        }
    );
    user.token = token;
    return user;
}


export default router;