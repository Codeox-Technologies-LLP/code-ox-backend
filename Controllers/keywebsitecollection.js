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

const addImageToKeyWebsiteCollection = async (req, res) => {
    try {
        const id = req.params.id;
        const imageUrl = req.body.imageUrl;

        // Find the keywebsitecollection document by its ID
        const keyweb = await keywebsitecollectionModel.findById(id);

        if (!keyweb) {
            return res.status(404).json({ statusCode: 404, message: 'Key website collection project not found' });
        }

        // Push the new image URL to the image array
        if (imageUrl) {
            keyweb.image.push(imageUrl);
        }

        // Save the updated keywebsitecollection
        const updatedKeyweb = await keyweb.save();

        res.status(200).json({ statusCode: 200, success: true, message: 'Image added successfully', data: updatedKeyweb });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
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
        const { KeyWebsiteCollectionsHeading, KeyWebsiteCollectionsDescription } = req.body;

        const image = req.file ? req.file.path : undefined; // Check if req.file exists
        const imageUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;

        const keyweb = await keywebsitecollectionModel.findById(id);

        if (!keyweb) {
            return res.status(404).json({ statusCode: 404, message: 'Key website not found' });
        }

        // Define an array of data fields to update
        const dataFields = [
            { field: 'KeyWebsiteCollectionsHeading', value: KeyWebsiteCollectionsHeading },
            { field: 'KeyWebsiteCollectionsDescription', value: KeyWebsiteCollectionsDescription }
            // Add more fields as needed
        ];

        // Determine the index of the first non-null image URL in the image array
        let firstImageUrlIndex = keyweb.image.findIndex(url => url !== null);

        // If no non-null image URL is found, default to the first index
        if (firstImageUrlIndex === -1) {
            firstImageUrlIndex = 0;
        }

        // Update the image URL at the determined index if imageUrl exists
        if (imageUrl) {
            keyweb.image[firstImageUrlIndex] = imageUrl;
        }

        // Update the data fields dynamically
        dataFields.forEach(({ field, value }) => {
            if (value) {
                keyweb[field] = value;
            }
        });

        // Save the updated keywebsitecollection
        const updatedKeyweb = await keyweb.save();

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
        const index = req.params.index;

        const response = await keywebsitecollectionModel.findByIdAndUpdate(
            id,
            { $unset: { [`image.${index}`]: 1 } },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Key website collection project not found' });
        }

        // Filter out the null value after deletion
        response.image = response.image.filter((image) => image !== null);

        res.status(200).json({ statusCode: 200, success: true, message: 'Key website collection project image deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};



module.exports = { addkeywebsitecollection, getKeywebsitecollection, updateKeywebsitecollection, deleteKeyWebsiteCollection , }