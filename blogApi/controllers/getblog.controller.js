import { BlogModel } from "../models/blog.model.js";

const getAllBlogs = async (req, res) => {
  try {
    // Retrieve all blogs from the database
    const blogs = await BlogModel.find({});

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    
    return res.status(200).json({ message: "Blogs retrieved successfully", data: blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { getAllBlogs };
