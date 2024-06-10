const { trusted } = require('mongoose');
const AboutcodeoxModel = require('../Model/AboutCodeox')
const { addImage, updateImage, deleteImage } = require('../middlewares/image')
//post
const addAboutcodeox = async (req, res) => {
    try {
        // Assuming addImage is a function that handles image uploading and returns image path or URL
        const imageData =  addImage(req);
        if (!imageData) {
            return res.status(400).json({ message: 'Error adding image' });
        }
        const data = {
            title: req.body.title,
            image: imageData,
            contentText: req.body.contentText,
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

/// get
const getAboutcodeox = async (req, res) => {
    try {
        const data = await AboutcodeoxModel.find({})
        res.status(200).json({ statusCode: 200, message: 'Aboutcodeox fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update 
const updateAboutcodeox = async (req, res) => {
    try{
        const id = req.params.id;
    if (req.body.title) data['title'] = req.body.title;

    const image = updateImage(req)
    let data = {};
    if (image) {
        data['image'] = image;
    }

    if (req.body.contentText) data['contentText'] = req.body.contentText;
    const response = await AboutcodeoxModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    );
    if (!response) {
        return res.status(404).json({ statusCode: 404, success: false, message: 'Aboutcodeox not found'});  
    }
    res.status(200).json({ statusCode: 200, success: true, message: 'Aboutcodeox updated successfully', updateAboutcodeox }) 
} catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
}

};
    

//delete
const deleteAboutcodeox = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await AboutcodeoxModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Aboutcodeox not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Aboutcodeox deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addAboutcodeox, getAboutcodeox, updateAboutcodeox, deleteAboutcodeox }