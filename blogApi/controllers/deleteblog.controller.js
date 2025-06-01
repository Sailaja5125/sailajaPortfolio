import { BlogModel } from "../models/blog.model.js";

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the blog exists
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog
    await BlogModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { deleteBlog };