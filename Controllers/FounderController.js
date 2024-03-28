const founderModel = require('../Model/Founder')
const { addImage, updateImage } = require('../middlewares/image');

//post 
const addFounder = async (req, res) => {
    try {
        const imageData = addImage(req);
        if (!imageData) {
          return res.status(400).json({ message: 'Error adding image' });
        }
        const data = {
            image: imageData,
            name: req.body.name,
            role: req.body.role
        };
        const newFounder = await founderModel.create(data);
        res.status(200).json({ statusCode: 200, success: true, message: 'Founder added successfully', data: newFounder });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
//get
const getFounder = async (req, res) => {
    try {
        const data = await founderModel.find()
        res.status(200).json({ statusCode: 200, sucess: true, message: 'founder fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update
const updateFounder = async (req, res) => {
    try {
        const id = req.params.id;
        const image = updateImage(req)
        const data = {
            image: image,
            name: req.body.name,
            role: req.body.role
        };
        const response = await founderModel.findByIdAndUpdate(id, data, { new: true });
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: "No founder found with the provided ID" });
        }
        res.status(200).json({ statusCode: 200, sucess: true, message: 'Founder updated successfully', success: true, data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
///delete
const deleteFounder = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await founderModel.findOneAndDelete({ _id: id });
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'founder not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'founder deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
module.exports = { addFounder, getFounder, updateFounder, deleteFounder }