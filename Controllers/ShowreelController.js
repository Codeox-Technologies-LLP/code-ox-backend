const showreelModel = require('../Model/showreel')
const mongoose = require('mongoose');

const addshowreel = async (req, res) => {
    try {

        const baseUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}/`;
        const images = req.files.map(file => baseUrl + file.path.replace(/\\/g, "/"));
        const newData = new showreelModel({
            image: images,
            showreelHeading: req.body.showreelHeading,
            showreeldescription: req.body.showreeldescription,
            showreelHeading1: req.body.showreelHeading1,
            showreeldescription1: req.body.showreeldescription1,
            category: req.body.category,
            link: req.body.link
        });
        const response = await newData.save();
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Showreel created successfully",
            data: response
        });
    } catch (error) {
        console.error("Error occurred:", error);
        let errorMessage = "Unknown error occurred";
        if (error instanceof mongoose.Error.ValidationError) {
            errorMessage = "Validation error occurred";
        }
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: errorMessage
        });
    }
};

//get 
const getShowreel = async (req, res, next) => {
    try {
        const category = req.query.category ? req.query.category.toLowerCase() : null;
        let showreelData = await showreelModel.find();
        if (category) {
            showreelData = showreelData.filter(item => item.category.toLowerCase() === category.toLowerCase()
            );
        }
        if (showreelData.length === 0) {
            return res.status(404).json({
                statusCode: 404, success: false, message: 'No showreel items found for the provided category.'
            });
        }
        return res.status(200).json({
            statusCode: 200, success: true, message: 'showreel Fectched Sucessfully', showreelItems: showreelData
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500, success: false, message: err.message
        });
    }
};

//update

const updatedShowreel = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ statusCode: 400, success: false, message: "Invalid ID provided" });

        const showreel = await showreelModel.findById(id);
        if (!showreel)
            return res.status(404).json({ statusCode: 404, success: false, message: "No showreel found with the provided ID" });

        const { indexToRemove, indexToUpdate, ...update } = req.body;
        const imageUrl = req.file ? `${req.protocol}://${req.hostname}:${req.socket.localPort}/${req.file.path.replace(/\\/g, "/")}` : null;

        if (indexToRemove !== undefined && indexToRemove >= 0 && indexToRemove < showreel.image?.length)
            showreel.image.splice(indexToRemove, 1);

        if (imageUrl) {
            if (indexToUpdate !== undefined && indexToUpdate >= 0 && indexToUpdate <= showreel.image.length)
                showreel.image[indexToUpdate] = imageUrl;
            else if (indexToUpdate > showreel.image.length)
                showreel.image.push(imageUrl);
        }

        const newPayload = { ...showreel.toObject(), ...update };
        const data = await showreelModel.findByIdAndUpdate(id, newPayload, { new: true });

        if (data)
            res.status(200).json({ statusCode: 200, success: true, message: "Showreel updated successfully", data });
        else
            res.status(404).json({ statusCode: 404, success: false, message: "No showreel found with the provided ID" });
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ statusCode: 500, success: false, message: "Showreel update failed", error: error.message });
    }
};




// //detle
const deleteShowreel = async (req, res) => {
    try {
        const { id } = req.params;


        const deletedShowreelItem = await showreelModel.findByIdAndDelete(id);

        if (!deletedShowreelItem) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Showreel item not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Showreel item deleted successfully', deletedItem: deletedShowreelItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, success: false, message: 'Server Error' });
    }
};

module.exports = { addshowreel, getShowreel, updatedShowreel, deleteShowreel }