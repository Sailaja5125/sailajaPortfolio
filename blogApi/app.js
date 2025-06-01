import express from "express";
import cors from "cors"; // Ensure you import 'cors' properly
import blogRouter from "./routes/blog.route.js"
// Initialize Express app
const app = express();

// Middleware setup
app.use(cors({ 
    origin: "*",
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    credentials: true
}));  // Allow cross-origin requests
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
// Serve static files from the 'frontend' directory
app.use(express.static("3d_portfolio"));

app.use("/api/v1/",blogRouter);
export { app };