import express from "express"
import path from "path"

import { ENV } from "./lib/env.js";

const app = express();

const __dirname = path.resolve();

//make my app ready for deployment :
if (ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    
        app.get("/{*any}",(req,res)=>{
            res.sendFile(path.join(__dirname,"../frontend/","dist","index.html"));
        })
}

app.get("/",  (req,res)=>{
    res.status(200).json({msg:"sucess from backend"});
})

app.listen(3000,()=>{
    console.log(`server is runnin on http://localhost:${ENV.PORT}`);
})