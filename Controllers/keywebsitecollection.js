
const webModel = require('../Model/Keywebsitecollection')
const mongoose = require('mongoose');



// post
const addKeyWebsiteCollection = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const { path: imagePath } = req.file;
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        const data = {
            image: baseUrl
        };
        const newKeyWebsite = new webModel(data);
        const response = await newKeyWebsite.save();
        res.status(200).json({ statusCode: 200, success: true, message: ' keywebsite added successfully', response });
    } catch (error) {
  
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
//get

const getKeyWebsiteCollection = async (req, res) => {
    try {
       const data = await webModel.find({})
       res.status(200).json({ statusCode: 200, message: 'keywebsite fetched successfully', data: data })
    } catch (error) {
       res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
 }
//update
const updateKeyWebsiteCollection = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }
        const image = req.file ? req.file.path : undefined; // Check if req.file exists
        const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;
        const update = {
            image: baseUrl
        };
        const updatedKeywebsite = await webModel.findOneAndUpdate(
            { _id: id },
            update,
            { new: true }
        );
        if (!updatedKeywebsite) { 
            return res.status(404).json({ statusCode: 404, message: 'Keywebsite not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Keywebsite updated successfully', updatedKeywebsite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
    }
};
///delete
const deleteKeyWebsiteCollection = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }
        const response = await webModel.findOneAndDelete({ _id: id });
        if (!response) {
            res.status(200).json({ statusCode: 404, success: true, message: "no document were deleted" });
        }
        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addKeyWebsiteCollection, getKeyWebsiteCollection, updateKeyWebsiteCollection, deleteKeyWebsiteCollection }
