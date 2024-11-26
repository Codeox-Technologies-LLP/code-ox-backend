const blogModel = require('../Model/blog');
const { addImage, updateImage, deleteImage } = require('../middlewares/image');

// Create Blog
const addBlog = async (req, res) => {
    try {

        const logoData = req.files['logo'] ? req.files['logo'][0].path : null;
        const profileImageData = req.files['profileImage'] ? req.files['profileImage'][0].path : null;

        if (!logoData || !profileImageData) {
            return res.status(400).json({ message: 'Error adding images' });
        }
        const data = {
            logo: logoData,
            profileImage: profileImageData,
            name: req.body.name,
            content: req.body.content,
            date: new Date(),
        };

        const newBlog = new blogModel(data);
        await newBlog.save();
        res.status(200).json({ statusCode: 200, success: true, message: 'Blog created successfully', data: newBlog });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: 'Server Error', error: error.message });
    }
};

// Get All Blogs
const getBlogs = async (req, res) => {
    try {
        const data = await blogModel.find();
        res.status(200).json({ statusCode: 200, message: 'Blogs fetched successfully', data });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: 'Server Error', error: error.message });
    }
};

// Update Blog
const updateBlog = async (req, res) => {
    try {
        const id = req.params.id;

        let data = {};

        if (req.files) {

            if (req.files.logo) {
                data['logo'] = req.files.logo[0].path || data['logo'];
            }
            if (req.files.profileImage) {
                data['profileImage'] = req.files.profileImage[0].path || data['profileImage'];
            }
        }

        if (req.body.name) data['name'] = req.body.name;
        if (req.body.content) data['content'] = req.body.content;

        const response = await blogModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Blog not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Blog updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: 'Server Error', error: error.message });
    }
};


// Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await blogModel.findOneAndDelete({ _id: id });
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Blog not found' });
        }

        deleteImage(response);

        res.status(200).json({ statusCode: 200, success: true, message: 'Blog deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { addBlog, getBlogs, updateBlog, deleteBlog };
