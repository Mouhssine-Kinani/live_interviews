import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.model.js";


export const inngest = new Inngest({ id: "live_interview" });


const syncUser = inngest.createFunction(
    {id: "sync-user", triggers: [{event: "clerk/user.created"}]},
    async ({event})=>{
        await connectDB();
        const {id, email_addresses, first_name, last_name, image_url} = event.data;
        const newUser = {
            clerkId : id,
            email : email_addresses[0]?.email_address ,
            name : `${first_name || ""} ${last_name || ""}`,
            profileImage : image_url
        }
        
        await User.create(newUser);
        //todo: sync with stream
    }
)


const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db", triggers: [{event: "clerk/user.deleted"}]},
    async ({event})=>{
        await connectDB();
        const {id} = event.data;
        
        await User.deleteOne({clerkId : id});
        //todo: sync with stream
    }
)


export const functions = [syncUser, deleteUserFromDB];