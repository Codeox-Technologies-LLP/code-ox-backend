const showreelModel = require('../Model/showreel')
const mongoose = require('mongoose');


const addshowreel = async (req, res) => {
    try {
        const { showreelHeading, showreeldescripation, showreelheading1, showreeldescripation1, categories, link } = req.body;

        // Check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image file is required' });
        }

        const images = req.files.map(file => {
            return `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, "/")}`;
        });

        // Create a new showreel item
        const newShowreelItem = new showreelModel({
            image: images,
            showreelHeading,
            showreeldescripation,
            showreelheading1,
            showreeldescripation1,
            categories,
            link
        });

        const savedShowreelItem = await newShowreelItem.save();
        res.status(201).json(savedShowreelItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', statusCode: 500 });
    }
};

//get 
const getShowreelItems = async (req, res, next) => {
    try {
        const category = req.query.categories ? req.query.categories.toLowerCase() : null;
        let showreelData = await showreelModel.find();

        // Filter the data
        if (category) {
            showreelData = showreelData.filter(item => item.categories.toLowerCase() === category.toLowerCase()
            );
        }


        if (showreelData.length === 0) {
            return res.status(404).json({
                statusCode: 404, success: false, message: 'No showreel items found for the provided category.'
            });
        }

        return res.status(200).json({
            statusCode: 200, success: true, showreelItems: showreelData
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500, success: false, message: err.message
        });
    }
};

//update
const updateShowreel = async (req, res) => {
    try {
        const id = req.params.id;
        const imageUrl = req.body.imageUrl;

        const showreelItem = await showreelModel.findById(id);

        if (!showreelItem) {
            return res.status(404).json({ statusCode: 404, message: 'Showreel item not found' });
        }

        // Push the new image URL to the image array
        if (imageUrl) {
            showreelItem.image.push(imageUrl);
        }

        // Save the updated showreelItem
        const updatedShowreelItem = await showreelItem.save();

        res.status(200).json({ statusCode: 200, success: true, message: 'Image added successfully to showreel item', data: updatedShowreelItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
    }
};

  
//detle
const deleteShowreel = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the showreel item by its ID and delete it
        const deletedShowreelItem = await showreelModel.findByIdAndDelete(id);

        if (!deletedShowreelItem) {
            return res.status(404).json({ message: 'Showreel item not found' });
        }

        res.status(200).json({ message: 'Showreel item deleted successfully', deletedItem: deletedShowreelItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};






module.exports = { addshowreel, getShowreelItems, updateShowreel, deleteShowreel }