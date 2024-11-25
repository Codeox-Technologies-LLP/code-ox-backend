const Blogs = require("../Model/blog");
const { addImage, updateImage, deleteImage } = require('../middlewares/image');

// Create Blog
const createBlog = async function (req, res) {
    try {
        const data = req.body;
        if (req.file) {
            data.image = addImage(req);
        }
        const blog = new Blogs(data);
        await blog.save();
        res.status(200).json({ status: true, message: "Blog created successfully", data: blog });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

// Get All Blogs
const getAllBlogs = async function (req, res) {
    try {
        const blogs = await Blogs.find();
        res.status(200).json({ status: true, data: blogs });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

// Update Blog
const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.id;
        const updatedData = req.body;

        if (req.file) {
            updatedData.image = updateImage(req);
        }

        const blog = await Blogs.findByIdAndUpdate(blogId, updatedData, { new: true });
        if (!blog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }
        res.status(200).json({ status: true, message: "Blog updated successfully", data: blog });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

// Delete Blog
const deleteBlog = async function (req, res) {
    try {
        const blogId = req.params.id;
        const blog = await Blogs.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }

        // Delete associated image
        deleteImage(blog);

        res.status(200).json({ status: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };
