import { BlogModel } from "../models/blog.model.js";
import { imageupload } from "../utils/cloudinary.js";

const editBlog = async (req, res) => {
  try {
    const { id } = req.params; // Get blog ID from URL parameters
    const { title, author, category, tags, description, content, readTime, sources } = req.body;

    // Check if blog exists
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Validate required fields
    const actualTags = JSON.parse(tags);
    const actualSources = JSON.parse(sources);

    // Handle thumbnail update
    let thumbnail = blog.thumbnail;
    if (req.file) {
      const imgURL = await imageupload(req.file.path);
      thumbnail = imgURL.secure_url;
    }

    // Update blog entry
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      {
        title,
        author,
        category,
        tags: actualTags,
        description,
        thumbnail,
        content,
        readTime,
        sources: actualSources,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { editBlog };