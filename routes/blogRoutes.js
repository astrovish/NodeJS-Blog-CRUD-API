const express = require("express");
const {
    allBlogs, blogDetail, insertBlog, updateBlog, deleteBlog
} = require("../controllers/blogController");

// setting up router
const router = express.Router();

router.route("/")
    .get(allBlogs)
    .post(insertBlog);

router.route("/:id")
    .get(blogDetail)
    .put(updateBlog)
    .delete(deleteBlog);

module.exports = router;