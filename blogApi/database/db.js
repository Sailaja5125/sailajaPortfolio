import mongooose from "mongoose"


const DataBase = async()=>{
    try {
        await mongooose.connect(process.env.MONGO_DB);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed",error);
    }
}

export {DataBase}