import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { createblog } from "../controllers/createblog.controller.js";
import { getAllBlogs } from "../controllers/getblog.controller.js";
import { searchBlogs } from "../controllers/searchblog.controller.js";
import { deleteBlog } from "../controllers/deleteblog.controller.js";
import { editBlog } from "../controllers/editblog.controller.js";
const router = Router();

router.route('/createBlog').post(upload.single('image'), createblog);
router.route('/getblogs').get(getAllBlogs)
router.route('/searchblogs').get(searchBlogs) // - GET /search?category=Tech 
router.route('/deleteblog/:id').delete(deleteBlog) // - DELETE /6657c3f4a1b2c9e123456789
router.route('/editblog/:id').post(upload.single('image'), editBlog) // - PATCH/6657c3f4a1b2c9e123456789

export default router;