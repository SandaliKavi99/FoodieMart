import { Router } from "express";
import { sample_foods } from "../data";
import asynceHandler from 'express-async-handler';
import { FoodModel } from "../models/food.module";
import jwt, { JwtPayload } from "jsonwebtoken";
import util from 'util';
import { UserModel } from "../models/user.modules";

interface TokenPayload extends JwtPayload {
    email: string;
  }

const router=Router();
const authenticateToken = asynceHandler(async (req, res, next) => {

    //check token is exist
    const authHeader = req.headers.authorization;
    console.log(authHeader);
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Access Denied: Please Login into app"); // Throw an exception
    }
  
    const token = authHeader.split(" ")[1];

    //check token is valid

    try {
        const decodeToken = await new Promise<TokenPayload>((resolve, reject) => {
          jwt.verify(
            token,
            "88a6c5019bf3094b59af48184ea7accb723c077969345b97dcb97799aab37ce3eeb5dc5c29be05ee5c6a271fa4a8d2bc5d4741539ad47912da535a3e3e7f61e1",
            (err, decoded) => {
              if (err) {
                return reject(err);
              }
              resolve(decoded  as TokenPayload);
            }
          );
        });
        if(decodeToken){
            const email = decodeToken.email;
            const users = await UserModel.find();
            const user = users.find(user => user.email===email);
            if(user){
                next();
            }
            else{
                throw new Error("User does not Exist, Cannot access data"); // Throw an exception
            } 
        }
      } catch (err:any) {
        console.error("Token verification failed:", err.message);
      }
  });
  

router.get("/seed", asynceHandler(
    async (req, res) =>{
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount>0){
            res.send("Seed is already done");
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("seed is done");
    }
))

router.get("/", authenticateToken, asynceHandler(
    async (req,res)=>{
        // const user = req.user;
        const foods = await FoodModel.find();
        res.send(foods);
    }
))

router.get("/search/:item", authenticateToken, asynceHandler(
   async (req,res)=>{
    const searchItem = req.params.item;
    
    const foods = await FoodModel.find();
    const searchFoods = foods.filter(food=> food.name.toLowerCase().includes(searchItem.toLocaleLowerCase()));
    res.send(searchFoods);
   }
)
)

router.get("/:id", authenticateToken, asynceHandler(
    async (req,res)=>{
        const foodId = req.params.id;
        const foods = await FoodModel.find();
        const food = foods
        .filter(food=> food.id == foodId);
        res.send(food);
    }
))

export default router;