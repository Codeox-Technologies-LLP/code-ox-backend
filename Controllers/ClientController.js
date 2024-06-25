const { addImage, updateImage } = require('../middlewares/image');


const clientModel = require('../Model/Client')
const mongoose = require('mongoose');

// post
const addclient = async (req, res) => {
    try {
        const imageData = addImage(req); 
        if (!imageData) {
            return res.status(400).json({ message: 'Error adding image' });
        }
        const data = {
            image: imageData,
            category: req.body.category,
        };
        const newData = clientModel(data);
        const response = await newData.save();
        res.status(200).json({ statusCode: 200, success: true, message: 'Client projects added successfully', response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

//get
// const getClient = async (req, res, next) => {
//     try {
//         const category = req.query.category ? req.query.category.toLowerCase() : null;
//         let clients;
//         if (category && category !== 'all') {
//             clients = await clientModel.find({ category: category });
//         } else {
//             // Otherwise, fetch all clients
//             clients = await clientModel.find({});
//         }
//         if (clients.length === 0) {
//             return res.status(404).json({ statusCode: 404, success: false, message: 'No clients found.' });
//         }
//         return res.status(200).json({ statusCode: 200, success: true, clients: clients });
//     } catch (err) {
//         return res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
//     }
// };

const getClient =  async (req, res) => {
    try {
        const {category, q, id, status, page = 1, limit = 10 } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (q) {
            query.$or = [
                { category: { $regex: q, $options: 'i' } },
                // { heading: { $regex: q, $options: 'i' } },
            ];
        }
        if (status) {
            query.status = status;
        }

        const totalCount = await clientModel.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
        const skip = (page - 1) * limit;

        let data;
        if (id) {
            data = await clientModel.findOne({ ...query, _id: id });
            if (!data) {
                return res.status(404).json({
                    statusCode: 404,
                    status: false,
                    message: "No course found with the provided ID",
                });
            }
        } else {
            data = await clientModel.find(query)
                .skip(skip)
                .limit(limit);
        }

        if (data.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                status: false,
                message: "No courses found matching the criteria",
            });
        }

        const paginationInfo = {
            currentPage: parseInt(page),
            nextPage: page < totalPages ? parseInt(page) + 1 : null,
            prevPage: page > 1 ? parseInt(page) - 1 : null,
            totalPages,
            totalCount,
        };

        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "Courses fetched successfully",
            data,
            pagination: paginationInfo,
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            statusCode: 500,
            status: false,
            message: "Fetching courses failed",
            error: error.message,
        });
    }
}



//update
// const updateClient = async (req, res) => {
//     try {
//         const id = req.params.id;
//         if (!mongoose.isValidObjectId(id)) {
//             return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
//         }
//         const { category } = req.body;
//         const image = updateImage(req)
//         const update = {
//             image: image,
//             category: category,
//         };
//         const updatedClient = await clientModel.findOneAndUpdate(
//             { _id: id },
//             update,
//             { new: true }
//         );
//         if (!updatedClient) {
//             return res.status(404).json({ statusCode: 404, message: 'Client not found' });
//         }
//         res.status(200).json({ statusCode: 200, success: true, message: 'client updated successfully', updatedClient });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
//     }
// };


//working code
// const updateClient = async (req, res) => {
//     try {
//         const id = req.params.id;
//         if (!mongoose.isValidObjectId(id)) {
//             return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
//         }

//         const { category } = req.body;
//         let update = {};

//         const image = updateImage(req);
//         if (image) {
//             update.image = image;
//         }
//         if (category) {
//             update.category = category;
//         }

//         if (Object.keys(update).length === 0) {
//             return res.status(400).json({ statusCode: 400, message: 'No data to update' });
//         }

//         const updatedClient = await clientModel.findOneAndUpdate(
//             { _id: id },
//             update,
//             { new: true }
//         );

//         if (!updatedClient) {
//             return res.status(404).json({ statusCode: 404, message: 'Client not found' });
//         }

//         res.status(200).json({ statusCode: 200, success: true, message: 'Client updated successfully', updatedClient });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
//     }
// };


const updateClient = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCourse = await clientModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatedCourse) {
            return res.status(404).json({
                statusCode: 404,
                status: false,
                message: "No course found with this id",
            });
        }

        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "Course updated successfully",
           
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            status: false,
            message: "Updating course failed",
           
        });
    }
}
///delete
const deleteClient = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }

        const response = await clientModel.findOneAndDelete({ _id: id });
        if (!response) {
            res.status(200).json({ statusCode: 404, success: true, message: "no documents were deleted" });
        }
        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addclient, getClient, updateClient, deleteClient }
