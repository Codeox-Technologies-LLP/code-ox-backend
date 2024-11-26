const  CustomizationModel = require('../Model/CustomizationService')
const { addImage, updateImage, deleteImage } = require('../middlewares/image');

//POST
const addCustomizationService = async (req,res) => {
    try {

        const data = {
            title: req.body.title,
            description: req.body.description,
        };
        const newCustomizationService = new CustomizationModel(data);
        const savedCustomizationService = await newCustomizationService.save();
        return res.status(201).json({ 
            statusCode: 201, 
            success: true, 
            message: "CustomizationService added successfully", 
            data: savedCustomizationService
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500, 
            success: false, 
            message: err.message 
        });
    }
};

//get
const getCustomizationService = async (req,res) => {
    try {
        const data = await CustomizationModel.find({})
        res.status(200).json({ statusCode: 200, message: 'CustomizationService fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update 
const updateCustomizationService = async (req, res) => {
    try {
        const id = req.params.id;
        let data = {};


        if (req.body.title) data['title'] = req.body.title;
        if (req.body.description) data['description'] = req.body.description;

        // Check if data is not empty
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ statusCode: 400, success: false, message: 'No data provided to update' });
        }

        const response = await CustomizationModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }  // Ensure validators are run on update
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'CustomizationService not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'CustomizationService updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

// DELETE
const deleteCustomizationService = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await CustomizationModel.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'CustomizationService not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'CustomizationService deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
module.exports = { addCustomizationService, getCustomizationService, updateCustomizationService, deleteCustomizationService }
