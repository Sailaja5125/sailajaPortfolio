import { BlogModel } from "../models/blog.model.js";

const searchBlogs = async (req, res) => {
  try {
    // Extract search parameters from the query
    const {id, category, tag, author, title } = req.query;
    // Create a dynamic filter object
    let filter = {};
    if(id) filter._id = id; // Filter by blog ID
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] }; // Matches tag within array
    if (author) filter.author = author;
    if (title) filter.title = { $regex: title, $options: "i" }; // Case-insensitive search

    // Search blogs using filter
    const blogs = await BlogModel.find(filter);

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No matching blogs found" });
    }

    return res.status(200).json({ message: "Blogs retrieved successfully", data: blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { searchBlogs };