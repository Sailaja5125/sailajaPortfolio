import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const BlogEdit = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8080/api/v1/getblogs');
        setPosts(res.data.data || res.data);
      } catch {
        setError('Failed to load blogs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Confirm delete via toast action
  const confirmDelete = (id) => {
    toast(
      t => (
        <div className="flex flex-col space-y-2">
          <span>Are you sure you want to delete?</span>
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => {
                handleDelete(id);
                toast.dismiss(t.id);
              }}
              className="px-2 py-1 bg-red-600 text-white rounded"
            >Yes</button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-2 py-1 bg-gray-300 rounded"
            >No</button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // Delete handler
  const handleDelete = async (id) => {
    toast.promise(
      axios.delete(`http://localhost:8080/api/v1/deleteblog/${id}`),
      {
        loading: 'Deleting...', 
        success: () => {
          setPosts(prev => prev.filter(post => post._id !== id));
          return 'Deleted successfully';
        },
        error: 'Failed to delete',
      }
    );
  };

  // Edit handler
  const handleEdit = (id) => {
    navigate(`/editBlog/${id}`);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="p-6 absolute top-16 w-full h-full">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Blogs</h1>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <li
            key={post._id}
            className="flex flex-col justify-between bg-white rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div>
              <h2 className="text-lg font-semibold mb-1 truncate">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-4 truncate">by {post.author}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-auto">
              <button
                onClick={() => handleEdit(post._id)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
              >
                <Edit2 className="w-5 h-5" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => confirmDelete(post._id)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="col-span-full text-center text-gray-500">No blogs available.</li>
        )}
      </ul>
    </div>
  );
};

export default BlogEdit;
