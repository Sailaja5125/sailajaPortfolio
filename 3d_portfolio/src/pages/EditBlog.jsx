import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Editor } from "primereact/editor";
import axios from "axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    tags: [],
    tagInput: "",
    sources: [],
    sourceInput: "",
    description: "",
    thumbnail: null,
    readTime: "",
    content: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/searchblogs?id=${id}`);
        const blog = res.data.data[0];
        if (blog) {
          setForm({
            title: blog.title || "",
            author: blog.author || "",
            category: blog.category || "",
            content: blog.content || "",
            tags: blog.tags || [],
            tagInput: "",
            sources: blog.sources || [],
            sourceInput: "",
            description: blog.description || "",
            thumbnail: null,
            readTime: blog.readTime || ""
          });
        } else {
          toast.error("Blog not found");
          setError("Blog not found");
        }
      } catch {
        toast.error("Failed to load blog data");
        setError("Failed to load blog data");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files.length) {
      setForm(prev => ({ ...prev, thumbnail: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (e) => {
    setForm(prev => ({ ...prev, content: e.htmlValue }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (form.tagInput.trim()) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ""
      }));
    }
  };

  const removeTag = (tag) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAddSource = (e) => {
    e.preventDefault();
    if (form.sourceInput.trim()) {
      setForm(prev => ({
        ...prev,
        sources: [...prev.sources, prev.sourceInput.trim()],
        sourceInput: ""
      }));
    }
  };

  const removeSource = (src) => {
    setForm(prev => ({
      ...prev,
      sources: prev.sources.filter(s => s !== src)
    }));
  };

  const checkFormValidity = () => {
    return form.title && form.author && form.category && form.content;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'thumbnail' && val) {
        payload.append('image', val);
      } else if (Array.isArray(val)) {
        payload.append(key, JSON.stringify(val));
      } else {
        payload.append(key, val);
      }
    });

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/editblog/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 200) {
        toast.success("Blog updated successfully");
        // setTimeout(() => navigate("/"), 1500); // Redirect after 1.5 sec
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.title) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <form className="w-full bg-white absolute top-16" onSubmit={handleSave}>
      <Toaster />
      <div className="pt-16 px-5 pb-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Edit Blog</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor */}
          <div className="w-full lg:w-3/5 p-2 lg:p-5">
            <div className="card">
              <Editor
                value={form.content}
                onTextChange={handleContentChange}
                style={{ height: '200vh', margin: 4 }}
                placeholder="Write your blog here..."
              />
            </div>
          </div>
          {/* Details Panel */}
          <div className="w-full lg:w-2/5 p-2 lg:p-5">
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col">
                <label htmlFor="title" className="font-semibold">Title</label>
                <input id="title" name="title" value={form.title} onChange={handleChange} className="border p-2 rounded" />
              </div>
              {/* Author & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="author" className="font-semibold">Author</label>
                  <input id="author" name="author" value={form.author} onChange={handleChange} className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="category" className="font-semibold">Category</label>
                  <input id="category" name="category" value={form.category} onChange={handleChange} className="border p-2 rounded" />
                </div>
              </div>
              {/* Tags */}
              <div>
                <label className="font-semibold">Tags</label>
                <div className="flex gap-2 mt-1">
                  <input
                    name="tagInput"
                    value={form.tagInput}
                    onChange={handleChange}
                    onKeyDown={e => e.key === 'Enter' && handleAddTag(e)}
                    placeholder="Add tag"
                    className="border p-2 rounded flex-1"
                  />
                  <button onClick={handleAddTag} className="bg-blue-500 text-white px-3 rounded">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.tags.map(tag => (
                    <span key={tag} className="bg-blue-200 px-2 rounded flex items-center">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>
              {/* Sources */}
              <div>
                <label className="font-semibold">Sources</label>
                <div className="flex gap-2 mt-1">
                  <input
                    name="sourceInput"
                    value={form.sourceInput}
                    onChange={handleChange}
                    onKeyDown={e => e.key === 'Enter' && handleAddSource(e)}
                    placeholder="Add source URL"
                    className="border p-2 rounded flex-1"
                  />
                  <button onClick={handleAddSource} className="bg-green-500 text-white px-3 rounded">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.sources.map(src => (
                    <span key={src} className="bg-green-200 px-2 rounded flex items-center">
                      {src}
                      <button type="button" onClick={() => removeSource(src)} className="ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>
              {/* Description */}
              <div className="flex flex-col">
                <label htmlFor="description" className="font-semibold">Description</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} className="border p-2 rounded" />
              </div>
              {/* Thumbnail & Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="flex flex-col">
                  <label className="font-semibold">Thumbnail</label>
                  <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="readTime" className="font-semibold">Read Time</label>
                  <input id="readTime" name="readTime" value={form.readTime} onChange={handleChange} className="border p-2 rounded" />
                </div>
              </div>
              {/* Save Changes */}
              <button
                type="submit"
                disabled={!checkFormValidity() || loading}
                className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded ${(!checkFormValidity() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditBlog;
