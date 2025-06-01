import { model, Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String, // Capitalized `String`
        required: true, // Corrected `req` to `required`
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String], // Corrected `string` to `String`
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    readTime: { // Changed `ReadTime` to `readTime` for consistency
        type: String,
    },
    sources: {
        type: [String], // Capitalized `String`
        required: true,
        validate: { // Updated URL validation
            validator: function (urls) {
                return urls.every(url => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url));
            },
            message: "Invalid URL format",
        },
            
    },
}, { timestamps: true }); // Added timestamps to store createdAt & updatedAt automatically

const BlogModel = model("Blog", blogSchema);

export { BlogModel };