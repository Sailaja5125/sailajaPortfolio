import { BlogModel } from "../models/blog.model.js";
import { imageupload } from "../utils/cloudinary.js";

const createblog = async (req, res) => {
  try {
    const { title, author, category, tags, description, content, readTime, sources } = req.body;

    // Validate required fields
    if (!title || !author || !category || !tags || !description || !content || !sources) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const actualTags = JSON.parse(tags);
    const actualSources = JSON.parse(sources);

    // Handle thumbnail upload
    let thumbnail = "";
    if(req.file) {
      const imgURL = await imageupload(req.file.path);
      thumbnail = imgURL.secure_url;
    }

    // Create blog entry
    const blog = await BlogModel.create({
      title,
      author,
      category,
      tags:actualTags,
      description,
      thumbnail,
      content,
      readTime,
      sources :actualSources,
    });

    return res.status(200).json({ message: "Blog created successfully", data: blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export {createblog}