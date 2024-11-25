const Blogs = require('../Model/blog');

const createBlog = async function (req, res) {
    try {
        const data = req.body;
        const blog = new Blogs(data);
        await blog.save();
        res.status(200).json({ status: true, message: "Blog created successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

const getAllBlogs = async function (req, res) {
    try {
        const blogs = await Blogs.find(); 
        res.status(200).json({ status: true, data: blogs });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.id;
        const updatedData = req.body; 
        const blog = await Blogs.findByIdAndUpdate(blogId, updatedData, { new: true });
        if (!blog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }
        res.status(200).json({ status: true, message: "Blog updated successfully", data: blog });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

const deleteBlog = async function (req, res) {
    try {
        const blogId = req.params.id; 
        const blog = await Blogs.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }
        res.status(200).json({ status: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

module.exports = { createBlog,getAllBlogs,updateBlog,deleteBlog, };
