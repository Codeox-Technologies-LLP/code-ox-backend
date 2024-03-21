const keywebsitecollectionModel = require('../Model/Keywebsitecollection')
const mongoose = require('mongoose');
// keywebsitecollection

//post
const addkeywebsitecollection = async (req, res) => {
    try {
        const { KeyWebsiteCollectionsHeading, KeyWebsiteCollectionsDescription, } = req.body;

        // Check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image file is required' });
        }

        const images = req.files.map(file => {
            return `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, "/")}`;
        });

        // Create a new showreel item
        const newKeywebsiteItem = new keywebsitecollectionModel({
            image: images,
            KeyWebsiteCollectionsHeading,
            KeyWebsiteCollectionsDescription
        });

        const savedKeywebItem = await newKeywebsiteItem.save();
        res.status(201).json(savedKeywebItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', statusCode: 500 });
    }
};







//get 

const getKeywebsitecollection = async (req, res) => {
    try {
        const data = await keywebsitecollectionModel.findOne()

        res.status(200).json({ statusCode: 200, message: 'keywebsitecollection projects fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateKeywebsitecollection = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }
        const { KeyWebsiteCollectionsHeading, KeyWebsiteCollectionsDescription, } = req.body;

        const image = req.file ? req.file.path : undefined; // Check if req.file exists
        const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;
        const update = {
            image: baseUrl,
            KeyWebsiteCollectionsHeading,
            KeyWebsiteCollectionsDescription

        };

        const updatedKeyweb = await keywebsitecollectionModel.findByIdAndUpdate(
            { _id: id },
            update,
            { new: true }
        );

        if (!updatedKeyweb) {
            return res.status(404).json({ statusCode: 404, message: 'key website not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'kekywebsite updated successfully', updateKeywebsitecollection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
    }
};

//delete
const deleteKeyWebsiteCollection = async (req, res) => {
    try {
        const id = req.params.id;


        const response = await keywebsitecollectionModel.findOneAndUpdate(
            {},
            { $pull: { keywebsitecollection: { _id: id } } },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Key website collection project not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Key website collection project deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}


module.exports = { addkeywebsitecollection, getKeywebsitecollection, updateKeywebsitecollection, deleteKeyWebsiteCollection }