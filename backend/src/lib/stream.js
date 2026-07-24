import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";
import { StreamClient } from "@stream-io/node-sdk"

const STREAM_API_KEY = ENV.STREAM_API_KEY;
const STREAM_API_SECRET = ENV.STREAM_API_SECRET;

if(!STREAM_API_KEY || !STREAM_API_SECRET){
    console.error("one or both stream api key are missing");
}

export const streamClient = new StreamClient(STREAM_API_KEY,STREAM_API_SECRET)
export const chatClient = StreamChat.getInstance(STREAM_API_KEY,STREAM_API_SECRET);

export const upsertStreamUser = async (userData)=>{
    try{
        await chatClient.upsertUser(userData);
        console.log("Stream user upserted succesfully : ", userData);
    }catch(error){
        console.error("Error upserting Stream user: ",error);
    }
}

export const deleteStreamUser = async (userId)=>{
    try{
        await chatClient.deleteUser(userId);
        console.log("Stream user deleted succesfully : ", userId);
    }catch(error){
        console.error("Error deleting Stream user: ",error);
    }
}

