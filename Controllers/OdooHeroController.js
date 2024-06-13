const { trusted } = require('mongoose');
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
            heading1: req.body.heading1,
            heading2: req.body.heading2,
            buttonText: req.body.buttonText,
            buttonLink: req.body.buttonLink,
            image: imageData,
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
        const data = await OdooheroModel.find({})
        res.status(200).json({ statusCode: 200, message: 'Hero fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update 
const updateOdooHero = async (req, res) => {
    try{
        const id = req.params.id;
    if (req.body.heading1) data['heading1'] = req.body.heading1;
    if (req.body.heading2) data['heading2'] = req.body.heading2;
    if (req.body.buttonText) data['buttonText'] = req.body.buttonText;
    if (req.body.buttonLink) data['buttonLink'] = req.body.buttonLink;
    const image = updateImage(req)
    let data = {};
    if (image) {
        data['image'] = image;
    }

    const response = await OdooheroModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    );
    if (!response) {
        return res.status(404).json({ statusCode: 404, success: false, message: 'Hero not found'});  
    }
    res.status(200).json({ statusCode: 200, success: true, message: 'Hero updated successfully', updateOdooHero }) 
} catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
}

};
    

//delete
const deleteOdoohero= async (req, res) => {
    try {
        const id = req.params.id;
        const response = await OdooheroModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'hero not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Hero deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addOdoohero, getOdoohero, updateOdooHero, deleteOdoohero }