import mongoose from "mongoose"

import {ENV} from "./env.js"

export const connectDB = async ()=>{
    try {
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defined in the env");
        }
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log(`✅ connected to mongodb ${conn.connection.host}`)
    } catch (error) {
        console.error("❌ ERROR connecting to mongodb...",error);
        process.exit(1);
    }
}