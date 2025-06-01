import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Share2, Copy, Heart, BookOpen, Calendar, User, Tag, ExternalLink,
  Twitter, Facebook, Linkedin, Check, Clock, Eye, MessageCircle, Bookmark
} from 'lucide-react';
import axios from 'axios';

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/searchblogs?id=${id}`);
        const blog = response.data.data[0];
        if (blog) {
          setBlogData(blog);
          setLikeCount(blog.likes || 0);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blogData.title);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500">Failed to load blog. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="absolute top-16 w-full bg-gray-50">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Hero Section with Back Button */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img src={blogData.thumbnail} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <button
          onClick={() => navigate('/blog')}
          className="absolute top-4 left-4 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full mb-4">
              {blogData.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {blogData.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {blogData.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 cursor-pointer transition-colors">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-medium text-gray-900">{blogData.author}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(blogData.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blogData.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              2.4K views
            </span>
          </div>
        </div>

        {/* Description Box */}
        {blogData.description && (
          <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-700 italic">{blogData.description}</p>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setLiked(!liked);
                setLikeCount(liked ? likeCount - 1 : likeCount + 1);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${liked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg transition-colors ${bookmarked ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => shareOnSocial('twitter')} className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button onClick={() => shareOnSocial('facebook')} className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button onClick={() => shareOnSocial('linkedin')} className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm border p-8">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogData.content }} />
            </article>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Sources
                </h3>
                <div className="space-y-2">
                  {blogData.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">View source</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Article
                </h3>
                <div className="space-y-2">
                  <button onClick={() => shareOnSocial('twitter')} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span>Share on Twitter</span>
                  </button>
                  <button onClick={() => shareOnSocial('facebook')} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span>Share on Facebook</span>
                  </button>
                  <button onClick={() => shareOnSocial('linkedin')} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span>Share on LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default BlogPage;
