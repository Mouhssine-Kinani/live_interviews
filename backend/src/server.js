import express from "express"
import { ENV } from "./lib/env.js";

const app = express();

app.get("/",  (req,res)=>{
    res.status(200).json({msg:"sucess from backend"});
})

app.listen(3000,()=>{
    console.log(`server is runnin on http://localhost:${ENV.PORT}`);
})