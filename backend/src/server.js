import express from "express"
import path from "path"

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

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


const startServer = async ()=>{
    try {
        await connectDB();
        app.listen(ENV.PORT,()=>{console.log(`server is running ✅🌐 on http://localhost:${ENV.PORT}`); })
    } catch (error) {
       console.error("⛔⛔ error starting the server"); 
    }
}

startServer();