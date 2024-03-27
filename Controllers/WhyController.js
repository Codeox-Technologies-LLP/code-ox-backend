const WhychooseModel = require('../Model/Whychoose')

///post 
const addWhychoose = async (req, res) => {
    try {
        const { path: imagePath } = req.file;
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const data = {
            image: baseUrl,
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
        const imagePath = req.file ? req.file.path : null;
        let data = {};
        data = {
            ...data,
            description: req.body.description,
        }
        if (imagePath) {
            const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
            data['image'] = baseUrl;
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
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Whychoose not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Whychoose deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addWhychoose, getWhychoose, updateWhychoose, deleteWhychoose }