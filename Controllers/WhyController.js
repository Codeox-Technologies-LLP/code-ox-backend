const WhychooseModel = require('../Model/Whychoose')
const { addImage, updateImage, deleteImage } = require('../middlewares/image');
///post 
const addWhychoose = async (req, res) => {
    try {
        const imageData = addImage(req);
        if (!imageData) {
            return res.status(400).json({ message: 'Error adding image' });
        }
        const data = {
            image: imageData,
            description: req.body.description
        };
        const newWhyChooseUs = new WhychooseModel(data);
        await newWhyChooseUs.save();
        const response = await WhychooseModel(data);
        return res.status(201).json({ statusCode: 201, success: true, message: "Why Choose Card added successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, success: false, message: err.message });
    }
};

/// get
const getWhychoose = async (req, res) => {
    try {
        const data = await WhychooseModel.find({})
        res.status(200).json({ statusCode: 200, message: 'Whychoose projects fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update 
const updateWhychoose = async (req, res) => {
    try {
        const id = req.params.id;
        const imagePath = updateImage(req);
        let data = {};
        data = {
            ...data,
            description: req.body.description,
        }
        if (imagePath) {
            data['image'] = imagePath;
        }
        const filter = { _id: id };
        await WhychooseModel.findOneAndUpdate(
            filter,
            { $set: data },
            { new: true }
        );
        res.status(200).json({
            statusCode: 200,
            message: 'Whychoose projects updated successfully',
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

//delete
const deleteWhychoose = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await WhychooseModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Whychoose not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Whychoose deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addWhychoose, getWhychoose, updateWhychoose, deleteWhychoose }