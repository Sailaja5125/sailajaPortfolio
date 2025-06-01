import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, Menu, X, BookOpen, Zap, Heart, Filter ,Plus} from 'lucide-react';
import  Logo  from "../assets/images/Logo.png"
import axios from 'axios';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPosts , setFilteredPosts] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [posts , setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
// TODO : feture posts and recent posts should be fetched from an API or database
// TODO : add pagination to the posts
// TODO : search functionality should be improved to search by tags, categories, etc. should use a library like Fuse.js for better search experience
// TODO : add a loading state while fetching the posts
const fetchBlogs = async () => {
  setLoading(true);
  try {
    const res = await axios.get('http://localhost:8080/api/v1/getblogs');
    console.log("Fetched blogs:", res.data.data);
    const blogs = res.data.data
    setPosts(blogs);
    setFilteredPosts(blogs);
  } catch {
    setError('Failed to load blogs.');
  } finally {
    setLoading(false);
  }
};
 useEffect(() => {
    fetchBlogs();
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const featuredPosts = filteredPosts.slice(0, 2); 
  const recentPosts = filteredPosts.slice(2);
  const currentRecent = recentPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recentPosts.length / postsPerPage);

  
  
  const categories = ["All", "Design", "Technology", "Lifestyle", "Business" , "Health", "Travel", "Education", "Entertainment"];
   useEffect(() => {
    let results = [...posts];
    if (searchQuery) {
      const fuse = new Fuse(results, { keys: ['title', 'author', 'tags', 'category'], threshold: 0.3 });
      results = fuse.search(searchQuery).map(({ item }) => item);
    }
if (activeCategory.toLowerCase() !== 'all') {
      results = results.filter(post => 
        post.category && post.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFilteredPosts(results);
    // setCurrentPage(1);
  }, [posts, searchQuery, activeCategory]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Stories That
              <span className="block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                Inspire Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge insights, creative perspectives, and thought-provoking ideas 
              that shape the future of technology, design, and human experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href='#articles' className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <span>Explore Articles</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#newsletter"className="border-2 border-blue-400 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all duration-200 shadow-lg">
                Subscribe to Newsletter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search articles, authors, or topics..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-white border border-blue-200 rounded-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-blue-100 text-blue-600 px-6 py-4 rounded-full font-medium hover:bg-blue-200 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-blue-200">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        activeCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Results Counter */}
      {searchQuery && (
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-600">
              Found <span className="font-semibold text-blue-600">{filteredPosts.length}</span> articles
              {searchQuery && <span> for "{searchQuery}"</span>}
              {activeCategory !== "All" && <span> in {activeCategory}</span>}
            </p>
          </div>
        </section>
      )}

      {/* Featured Posts */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        {!searchQuery && <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Featured Stories</h2>}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredPosts.map((post, index) => (
            <article key={post._id || index} className="group cursor-pointer"   onClick={() => navigate(`/blogpage/${post._id}`)}>
              <div className="relative bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                {/* Conditional Image or Gradient Background */}
                {post.thumbnail || post.imageUrl ? (
                  <img
                    src={post.thumbnail || post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-64"
                    style={{
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #bbdefb 50%, #90caf9 100%)'
                    }}
                  />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="text-blue-200 font-medium">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Recent Posts Grid */}
<section id="articles" className="px-4 sm:px-6 lg:px-8 mb-20">
        {!searchQuery && <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Latest Articles</h2>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <article key={post._id} className="group cursor-pointer"   onClick={() => navigate(`/blogpage/${post._id}`)}>
              <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl overflow-hidden hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50">
                {/* Conditional Image or Gradient */}
                {post.thumbnail || post.imageUrl ? (
                  <img
                    src={post.thumbnail || post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-48"
                    style={{
                      background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 50%, #ffb74d 100%)'
                    }}
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.description.length > 50 ?
                      `${post.description.substring(0, 50)}...` :
                      post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <span className="text-blue-500 font-medium">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length <= 2 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 mt-8">{[...Array(totalPages)].map((_, i) => (<button key={i} onClick={() => setCurrentPage(i+1)} className={`px-4 py-2 rounded-full ${currentPage===i+1?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'}`}>{i+1}</button>))}</div>
        )}
      </section>

      {/* Newsletter Section */}
      <section id='newsletter' className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-12 text-center shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-full p-3 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Ahead of the Curve</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Get the latest insights delivered to your inbox. Join 50,000+ readers who trust us for cutting-edge content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white border border-blue-200 rounded-full px-6 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
              />
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

<div className='flex justify-center mb-20'>
<a href="/createblog"className="border-2 border-blue-400 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all duration-200 shadow-lg flex items-center space-x-2 gap-2">
                Create Blog
                <Plus />
              </a>
</div>
      {/* Footer */}
      <footer className="border-t border-blue-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                  <img src={Logo} alt='logo' className='w-10 h-10 object-contain rounded-lg' />
                </div>
                <span className="text-xl font-bold text-gray-800">Sandy</span>
              </div>
              <p className="text-gray-600 text-sm">
                Inspiring innovation through thoughtful storytelling and cutting-edge insights.
              </p>
            </div>
            
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Content</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#articles" className="hover:text-blue-600 transition-colors">Latest Articles</a></li>
                <li><a href="#articles" className="hover:text-blue-600 transition-colors">Featured Stories</a></li>
                <li><a href="#articles" className="hover:text-blue-600 transition-colors">Categories</a></li>
                <li><a href="#newsletter" className="hover:text-blue-600 transition-colors">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 Sandy. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-600 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for curious minds</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    );
};

export default Blog;