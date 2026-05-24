import mongoose from "mongoose"
import dns from "dns";

dns.setServers(["1.1.1.1","8.8.8.8"]);
const DataBase = async()=>{
    try {
        const url = "mongodb://sailajapuvala5125_db_user:Rf5FgJeXwn95Uunw@cluster0.bzkha91.mongodb.net/?appName=Cluster0"
        await mongoose.connect(process.env.MONGO_DB_SECONDARY || url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed",error);
    }
}

export {DataBase}