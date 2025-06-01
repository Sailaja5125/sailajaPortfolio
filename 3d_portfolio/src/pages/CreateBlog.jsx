
import React, { useContext, useEffect, useState , useRef } from "react";
import { TextEditor } from "../components";
import { BlogContext } from "../context/BlogContext";
import toast , { Toaster } from "react-hot-toast";
import axios from "axios";        
export default function CreateBlog() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    tags: [],
    description: "",
    thumbnail: null,
    content: "",
    readTime: "",
    sources: [],
  });
  const [currentTag, setCurrentTag] = useState("");
  const [currentSource, setCurrentSource] = useState("");
  const {text} = useContext(BlogContext);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files.length) {
      setForm((prev) => ({ ...prev, thumbnail: files[0] }));
    }
    else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  
   useEffect(()=>{
   setForm((prev) => ({ ...prev, content: text }));
   },[text])

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = currentTag.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setCurrentTag("");
  };

  const removeTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleAddSource = (e) => {
    e.preventDefault();
    const src = currentSource.trim();
    // invalid 
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(src)){ toast.error("Invalid URL"); return false;}

    if (src && !form.sources.includes(src)) {
      setForm((prev) => ({ ...prev, sources: [...prev.sources, src] }));
    }
    setCurrentSource("");
  };

  const removeSource = (srcToRemove) => {
    setForm((prev) => ({
      ...prev,
      sources: prev.sources.filter((s) => s !== srcToRemove),
    }));
  };

  const checkFormValidity = ()=>{
    const { title, author, category, description , content} = form;
    if (!title || !author || !category || !description || !content || form.tags.length === 0 ||form.sources.length === 0) {
      return false;
    }
    
    return true;
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!checkFormValidity()){ toast.error("Please fill all the required fields."); return ;}
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("category", form.category);
      formData.append("tags", JSON.stringify(form.tags));
      formData.append("description", form.description);
      formData.append("image", form.thumbnail);
      formData.append("content", form.content);
      formData.append("readTime", form.readTime);
      formData.append("sources", JSON.stringify(form.sources));
      const response = await axios.post("http://localhost:8080/api/v1/createBlog", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.status === 200){
         console.log("Blog created successfully:", response.data);
         toast.success("Blog submitted successfully!");
      }
    } catch (error) {
      console.log("Error creating blog:", error);
      toast.error("Failed to submit blog.Internal server issue.");  
    }
     
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white">
      <div><Toaster/></div>
      <div className="pt-16 px-5 pb-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Write. Reflect. Repeat.
        </h2>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-1 bg-blue-600"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Text Editor */}
          <div className="w-full lg:w-3/5 p-2 lg:p-5">
            <TextEditor />
          </div>
          {/* Details Panel */}
          <div className="w-full lg:w-2/5 p-2 lg:p-5">
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Details
            </h3>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-blue-600"></div>
            </div>
            <div className="w-full px-4 py-6 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-700 font-semibold mb-1">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Author & Category Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="author" className="text-gray-700 font-semibold mb-1">
                    Author
                  </label>
                  <input
                    id="author"
                    name="author"
                    type="text"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Enter author"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="category" className="text-gray-700 font-semibold mb-1">
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* Tags & Sources */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-1">Tags</label>
                  <input
                    name="tagInput"
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
                    placeholder="Add a tag and press Enter"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-1">Sources</label>
                  <input
                    name="sourceInput"
                    type="text"
                    value={currentSource}
                    onChange={(e) => setCurrentSource(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSource(e)}
                    placeholder="Add a source and press Enter"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.sources.map((src, idx) => (
                      <span
                        key={idx}
                        className="flex items-center px-3 py-1 bg-green-500 text-white rounded-full text-sm"
                      >
                        {src}
                        <button
                          type="button"
                          onClick={() => removeSource(src)}
                          className="ml-2 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short description"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              {/* Thumbnail & Read Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col w-full max-w-md mx-auto">
  <label htmlFor="thumbnail" className="text-gray-700 font-semibold mb-2">
    Upload Thumbnail
  </label>
  
  <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 shadow-sm flex flex-col items-center justify-center">
    <input
      id="thumbnail"
      name="thumbnail"
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="hidden"
    />
    <label
      htmlFor="thumbnail"
      className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
    >
      Select Image
    </label>

    {form.thumbnail && (
      <div className="mt-4 flex flex-col items-center">
        <p className="text-sm text-gray-600">Selected: {form.thumbnail.name}</p>
        
      </div>
    )}
  </div>
</div>
                <div className="flex flex-col">
                  <label htmlFor="readTime" className="text-gray-700 font-semibold mb-1">
                    Read Time
                  </label>
                  <input
                    id="readTime"
                    name="readTime"
                    type="text"
                    value={form.readTime}
                    onChange={handleChange}
                    placeholder="e.g. 5 min"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="self-end px-6 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!checkFormValidity()}                
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
