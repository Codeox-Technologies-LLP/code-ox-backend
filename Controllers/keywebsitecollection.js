const keywebsitecollectionModel = require('../Model/Keywebsitecollection');
const mongoose = require('mongoose');

// Create (POST) operation
const addKeyWebsiteCollection = async (req, res) => {
    try {
        const { KeyWebsiteCollectionsHeading, KeyWebsiteCollectionsDescription } = req.body;

        // Check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image file is required' });
        }

        const images = req.files.map(file => {
            return `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, "/")}`;
        });

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

// get
const getKeyWebsiteCollection = async (req, res) => {
    try {
        const data = await keywebsitecollectionModel.findOne();
        res.status(200).json({ statusCode: 200, message: 'Key website collection fetched successfully', data: data });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
// updatr
const updateKeyWebsiteCollection = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }

        const { KeyWebsiteCollectionsHeading, KeyWebsiteCollectionsDescription } = req.body;

        // Check if the required fields are present in the request body
        if (!KeyWebsiteCollectionsHeading || !KeyWebsiteCollectionsDescription) {
            return res.status(400).json({ statusCode: 400, message: 'KeyWebsiteCollectionsHeading and KeyWebsiteCollectionsDescription are required' });
        }

        // Check if the file is being uploaded correctly
        const image = req.file ? req.file.path : undefined;
        const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;
        
        // Construct the update object
        const update = {
            image: baseUrl,
            KeyWebsiteCollectionsHeading,
            KeyWebsiteCollectionsDescription
        };

        // Find and update the document based on ID
        const updatedKeyweb = await keywebsitecollectionModel.findByIdAndUpdate(id, update, { new: true });

        // Check if the document was updated successfully
        if (!updatedKeyweb) {
            return res.status(404).json({ statusCode: 404, message: 'Key website not found' });
        }

        // Send the updated document as response
        res.status(200).json({ statusCode: 200, success: true, message: 'Key website updated successfully', data: updatedKeyweb });
    } catch (error) {
        console.error('Error in updateKeyWebsiteCollection:', error); // Log the error for debugging
        res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
    }
};



// Delete 
const deleteKeyWebsiteCollection = async (req, res) => {
    try {
        const response = await keywebsitecollectionModel.findOneAndDelete();
        
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Key website collection not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Key website collection deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

module.exports = { addKeyWebsiteCollection, getKeyWebsiteCollection, updateKeyWebsiteCollection, deleteKeyWebsiteCollection };
