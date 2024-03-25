const keywebsitecollectionModel = require('../Model/Keywebsitecollection')
const mongoose = require('mongoose');
// keywebsitecollection

//post
const addkeywebsitecollection = async (req, res) => {
    try {
        const { KeyWebsiteCollectionsHeading, KeyWebsiteCollectionsDescription } = req.body;

        // Check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image file is required' });
        }

        const images = req.files.map(file => {
            return `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, "/")}`;
        });

        // Find existing document or create a new one
        let keyWebsiteCollection = await keywebsitecollectionModel.findOne();
        if (!keyWebsiteCollection) {
            keyWebsiteCollection = new keywebsitecollectionModel();
        }

        // Add new images to the existing array
        keyWebsiteCollection.image.push(...images);
        keyWebsiteCollection.KeyWebsiteCollectionsHeading = KeyWebsiteCollectionsHeading;
        keyWebsiteCollection.KeyWebsiteCollectionsDescription = KeyWebsiteCollectionsDescription;

        // Save the updated document
        const savedKeywebItem = await keyWebsiteCollection.save();

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

        const imageIndexToUpdate = req.params.index; // Extract imageIndexToUpdate from req.params

        if (imageIndexToUpdate === undefined || isNaN(imageIndexToUpdate)) {
            return res.status(400).json({ statusCode: 400, message: 'Image index to update is required and must be a number' });
        }

        const image = req.file ? req.file.path : undefined; // Check if req.file exists
        const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;

        const keyWebsiteCollection = await keywebsitecollectionModel.findById(id);

        if (!keyWebsiteCollection) {
            return res.status(404).json({ statusCode: 404, message: 'Key website not found' });
        }

        if (keyWebsiteCollection.image.length <= imageIndexToUpdate) {
            return res.status(400).json({ statusCode: 400, message: 'No image found at the specified index' });
        }

        // Update the image at the specified index
        keyWebsiteCollection.image[imageIndexToUpdate] = baseUrl;

       
        if (req.body.KeyWebsiteCollectionsHeading) {
            keyWebsiteCollection.KeyWebsiteCollectionsHeading = req.body.KeyWebsiteCollectionsHeading;
        }
        if (req.body.KeyWebsiteCollectionsDescription) {
            keyWebsiteCollection.KeyWebsiteCollectionsDescription = req.body.KeyWebsiteCollectionsDescription;
        }

        // Save the updated document
        const updatedKeyweb = await keyWebsiteCollection.save();

        res.status(200).json({ statusCode: 200, success: true, message: 'Key website updated successfully', data: updatedKeyweb });
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