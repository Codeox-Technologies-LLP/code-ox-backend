const AboutcodeoxModel = require('../Model/AboutCodeox');
const { addImage, updateImage, deleteImage } = require('../middlewares/image');

// POST
const addAboutcodeox = async (req, res) => {
    try {
        let imageData;
        let cardImages = [];
        if (req.file) {
            // If single file upload for 'image'
            imageData = req.file.path; // Adjust path as per your multer configuration
        } else if (req.files && req.files['image']) {
            // If multiple files under 'image' field
            imageData = req.files['image'].map(file => file.path);
        }

        if (req.files && req.files['cardImage']) {
            // If multiple files under 'cardImage' field
            if (Array.isArray(req.files['cardImage'])) {
                cardImages = req.files['cardImage'].map(file => file.path);
            } else {
                cardImages.push(req.files['cardImage'].path); // Push single file path
            }
        }

        if (!imageData) {
            return res.status(400).json({ message: 'Error adding image: No file uploaded' });
        }


        // const cards = Array.isArray(req.body.cards) ? req.body.cards : [];

        const data = {
            title: req.body.title,
            image: imageData,
            contentText: req.body.contentText,
            cards:  {
                cardDescription: req.body.cardDescription,
                cardHeading: req.body.cardHeading,
                cardImage: cardImages[0]
            }
        };

        const newAboutcodeox = new AboutcodeoxModel(data);
        const savedAboutcodeox = await newAboutcodeox.save();
        
        return res.status(201).json({ 
            statusCode: 201, 
            success: true, 
            message: "About Codeox added successfully", 
            data: savedAboutcodeox 
        });
    } catch (err) {
        res.status(500).json({ 
            statusCode: 500, 
            success: false, 
            message: err.message 
        });
    }
};

// GET
const getAboutcodeox = async (req, res) => {
    try {
        const data = await AboutcodeoxModel.find({});
        res.status(200).json({ statusCode: 200, message: 'Aboutcodeox fetched successfully', data: data });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}

// UPDATE
const updateAboutcodeox = async (req, res) => {
    try {
        const id = req.params.id;
        let data = {};

        // Update title if provided
        if (req.body.title) data['title'] = req.body.title;

        // Handle image updates
        let imageData;
        let cardImages = [];

        if (req.file) {
            // Single file upload for 'image'
            imageData = req.file.path; // Adjust path as per your multer configuration
        } else if (req.files && req.files['image']) {
            // Multiple files under 'image' field
            imageData = req.files['image'].map(file => file.path);
        }

        if (req.files && req.files['cardImage']) {
            // Multiple files under 'cardImage' field
            if (Array.isArray(req.files['cardImage'])) {
                cardImages = req.files['cardImage'].map(file => file.path);
            } else {
                cardImages.push(req.files['cardImage'].path); // Single file path
            }
        }

        if (imageData) {
            data['image'] = imageData;
        }

        // Update contentText if provided
        if (req.body.contentText) data['contentText'] = req.body.contentText;

        // Handle card updates
        if (req.body.cardDescription || req.body.cardHeading || cardImages.length > 0) {
            data['cards'] = {
                cardDescription: req.body.cardDescription,
                cardHeading: req.body.cardHeading,
                cardImage: cardImages[0] // Assuming one cardImage is being updated
            };
        }

        const response = await AboutcodeoxModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Aboutcodeox not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Aboutcodeox updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

// DELETE
const deleteAboutcodeox = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await AboutcodeoxModel.findOneAndDelete({ _id: id });
        deleteImage(response);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Aboutcodeox not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Aboutcodeox deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

module.exports = { addAboutcodeox, getAboutcodeox, updateAboutcodeox, deleteAboutcodeox };
