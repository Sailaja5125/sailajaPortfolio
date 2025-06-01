import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Blog, BlogPage, CreateBlog, EditBlog, Home } from "./pages";
import Portfolio from "./pages/Portfolio";
import { BlogProvider } from "./context/BlogContextProvider";
import { BlogEdit } from "./pages";

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/portfolio' element={<Portfolio/>} />
                  <Route path='/createblog' element={
                    <BlogProvider>
                      <CreateBlog/>
                    </BlogProvider>
                    } />
                    <Route path='/blog' element={<Blog/>} />
                    <Route path='/blogedit' element={<BlogEdit/>} />
                  <Route path='/editblog/:id' element={<EditBlog/>} />
                  <Route path='/blogpage/:id' element={<BlogPage/>} />
                </Routes>
                {/* <Footer /> */}
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
