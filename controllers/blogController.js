const { default: slugify } = require("slugify");
const Blog = require("../models/blog");

// all blogs
const allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch(e) {
        res.status(400).json({status: false, message: "Bad request"});
    }
}

// blog detail
const blogDetail = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.json(blog);
    } catch(e) {
        res.status(400).json({status: false, message: "Bad request"});
    }
}

// insert blog
const insertBlog = async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            body: req.body.body
        })
        await blog.save();
        
        res.json({status: true, message: "Blog inserted successfully."});
    } catch(e) {
        res.status(400).json({status: false, message: "Bad request"});
    }
}

// update blog
const updateBlog = async (req, res) => {
    try {
        const blog = {
            title: req.body.title,
            body: req.body.body,
            userId: 89,
            slug: slugify(req.body.title, {
                lower: true,
                strict: true
            })
        };
        await Blog.findByIdAndUpdate(req.params.id, blog);
        res.json({status: true, message: "Blog updated successfully."});
    } catch(e) {
        res.status(400).json({status: false, message: "Bad request"});
    }
}

// delete blog
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({status: true, message: "Blog deleted successfully."});
    } catch(e) {
        res.status(400).json({status: false, message: "Bad request"});
    }
}

module.exports = {
    allBlogs,
    blogDetail, 
    insertBlog, 
    updateBlog, 
    deleteBlog
}