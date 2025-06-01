import { app } from "./app.js";
import { DataBase } from "./database/db.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const startServer = async () => {
  try {
    await DataBase();
    const PORT = process.env.PORT || 8080;
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit the process on failure
  }
};

// Start the server
startServer();