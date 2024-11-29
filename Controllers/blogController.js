const blogModel = require('../Model/blog');
const { addImage, updateImage, deleteImage } = require('../middlewares/image');

// Create Blog
// const addBlog = async (req, res) => {
//     try {

//         const logoData = req.files['logo'] ? req.files['logo'][0].path : null;
//         const profileImageData = req.files['profileImage'] ? req.files['profileImage'][0].path : null;

//         if (!logoData || !profileImageData) {
//             return res.status(400).json({ message: 'Error adding images' });
//         }
//         const data = {
//             logo: logoData,
//             profileImage: profileImageData,
//             name: req.body.name,
//             content: req.body.content,
//             title: req.body.title,
//             date: new Date(),
//         };

//         const newBlog = new blogModel(data);
//         await newBlog.save();
//         res.status(200).json({ statusCode: 200, success: true, message: 'Blog created successfully', data: newBlog });
//     } catch (error) {
//         res.status(500).json({ statusCode: 500, success: false, message: 'Server Error', error: error.message });
//     }
// };

const addBlog = async (req, res) => {
    try {
        const { name, content, title } = req.body;
        if (!name || !content || !title) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const logoPath = req.files['logo']?.[0]?.path;
        const profileImagePath = req.files['profileImage']?.[0]?.path;

        if (!logoPath || !profileImagePath) {
            return res.status(400).json({ message: 'Logo and profile image are required' });
        }

        const data = {
            logo: `${req.protocol}://${req.get('host')}/${logoPath.replace(/\\/g, '/')}`,
            profileImage: `${req.protocol}://${req.get('host')}/${profileImagePath.replace(/\\/g, '/')}`,
            name,
            content,
            title,
            date: new Date(),
        };

        const newBlog = await blogModel.create(data);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Blog created successfully',
            data: newBlog,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};


// Get All Blogs
const getBlogs = async (req, res) => {
    try {
        const { page = 1, search = '' } = req.query;

        const pageNum = parseInt(page);
        const limitNum = 8;

        const searchQuery = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } },
                    { name: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const totalBlogs = await blogModel.countDocuments(searchQuery);

        const data = await blogModel
            .find(searchQuery)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .sort({ date: -1 });

        const pagination = {
            currentPage: pageNum,
            totalPages: Math.ceil(totalBlogs / limitNum),
            totalBlogs,
        };

        res.status(200).json({
            statusCode: 200,
            message: 'Blogs fetched successfully',
            data,
            pagination,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};



const getBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Blog not found' });
        }

        res.status(200).json({ statusCode: 200, message: 'Blog fetched successfully', data: blog });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: 'Server Error', error: error.message });
    }
};

// Update Blog
// const updateBlog = async (req, res) => {
//     try {
//         const id = req.params.id;

//         let data = {};

//         if (req.files) {

//             if (req.files.logo) {
//                 data['logo'] = req.files.logo[0].path || data['logo'];
//             }
//             if (req.files.profileImage) {
//                 data['profileImage'] = req.files.profileImage[0].path || data['profileImage'];
//             }
//         }

//         if (req.body.name) data['name'] = req.body.name;
//         if (req.body.title) data['title'] = req.body.title;
//         if (req.body.content) data['content'] = req.body.content;

//         const response = await blogModel.findByIdAndUpdate(
//             id,
//             { $set: data },
//             { new: true }
//         );
//         if (!response) {
//             return res.status(404).json({ statusCode: 404, success: false, message: 'Blog not found' });
//         }

//         res.status(200).json({ statusCode: 200, success: true, message: 'Blog updated successfully', data: response });
//     } catch (error) {
//         res.status(500).json({ statusCode: 500, success: false, message: 'Server Error', error: error.message });
//     }
// };

const updateBlog = async (req, res) => {
    try {
        const id = req.params.id;

        const data = { ...req.body };

        if (req.files) {
            if (req.files.logo) {
                data.logo = `${req.protocol}://${req.get('host')}/${req.files.logo[0].path.replace(/\\/g, '/')}`;
            }
            if (req.files.profileImage) {
                data.profileImage = `${req.protocol}://${req.get('host')}/${req.files.profileImage[0].path.replace(/\\/g, '/')}`;
            }
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(id, { $set: data }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Blog not found' });
        }

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Server Error',
            error: error.message,
        });
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

module.exports = { addBlog, getBlogs, updateBlog, deleteBlog, getBlogById };
