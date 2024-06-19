const OdooheroModel = require('../Model/OdooHero')
const { addImage, updateImage, deleteImage } = require('../middlewares/image')

//post 
const addOdoohero = async (req, res) => {
    try {
        const imageData =  addImage(req);
        if (!imageData) {
            return res.status(400).json({ message: 'Error adding image' });
        }
        const data = {
            backgroundImage: imageData,
            title: req.body.title,
            description: req.body.description,
        };
        const newOdoohero  = new OdooheroModel(data);
        const savedOdoohero  = await newOdoohero.save();
        return res.status(201).json({ 
            statusCode: 201, 
            success: true, 
            message: "Hero added successfully", 
            data: savedOdoohero 
        });
    } catch (err) {
        res.status(500).json({ 
            statusCode: 500, 
            success: false, 
            message: err.message 
        });
    }
};

/// get
const getOdoohero = async (req, res) => {
    try {
        const data = await OdooheroModel.findOne({})
        res.status(200).json({ statusCode: 200, message: 'Hero fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update 
const updateOdooHero = async (req, res) => {
    try {
        const id = req.params.id;
        let data = {};

        if (req.body.title) data['title'] = req.body.title;
        if (req.body.description) data['description'] = req.body.description;

        const backgroundImage = updateImage(req);
        if (backgroundImage) {
            data['backgroundImage'] = backgroundImage;
        }

        const response = await OdooheroModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Hero not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Hero updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

// DELETE
const deleteOdoohero = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await OdooheroModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Hero not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Hero deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

module.exports = { addOdoohero, getOdoohero, updateOdooHero, deleteOdoohero }