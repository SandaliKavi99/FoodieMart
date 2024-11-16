import { Router } from "express";
import { sample_foods } from "../data";
import asynceHandler from 'express-async-handler';
import { FoodModel } from "../models/food.module";

const router=Router();

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

router.get("/", asynceHandler(
    async (req,res)=>{
        const foods = await FoodModel.find();
        res.send(foods);
    }
))

router.get("/search/:item",asynceHandler(
   async (req,res)=>{
    const searchItem = req.params.item;
    
    const foods = await FoodModel.find();
    const searchFoods = foods.filter(food=> food.name.toLowerCase().includes(searchItem.toLocaleLowerCase()));
    res.send(searchFoods);
   }
)
)

router.get("/:id", asynceHandler(
    async (req,res)=>{
        const foodId = req.params.id;
        const foods = await FoodModel.find();
        const food = foods
        .filter(food=> food.id == foodId);
        res.send(food);
    }
))

export default router;