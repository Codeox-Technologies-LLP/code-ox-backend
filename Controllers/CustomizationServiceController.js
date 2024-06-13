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

const updateCustomizationService = async (req,res) => {
    try {
        const id = req.params.id;
        let data = {};

        if (req.body.title) data['title'] = req.body.title;
        if (req.body.description) data['description'] = req.body.description;

        const response = await CustomizationModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'CustomizationService not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'CustomizationService updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

//Delete

const deleteCustomizationService = async (req,res) => {
    try {
        const id = req.params.id;
        const response = await CustomizationModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'CustomizationService not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'CustomizationService deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }

};

module.exports = { addCustomizationService, getCustomizationService, updateCustomizationService, deleteCustomizationService }
