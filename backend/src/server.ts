import dotenv from 'dotenv';
dotenv.config();

import { dbConnect } from './configs/database.config';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import paymentRouter from './routers/payment.router';

dbConnect();
const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}))

app.use("/api/foods",foodRouter);
app.use("/api/users", userRouter);
app.use("/api/checkout", paymentRouter);

const port = 5000;

app.listen(port,()=>{
    console.log("web site is hosting at 5000 port")
})