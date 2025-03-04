const valueModel = require('../Model/Ourvalue')
const { addImage, updateImage } = require('../middlewares/image');
//post
const addValue = async (req, res) => {
    try {
        const imageData = addImage(req);
    if (!imageData) {
      return res.status(400).json({ message: 'Error adding image' });
    }
        const data = {
            name: req.body.name,
            gif: imageData,
            title: req.body.title,
            description: req.body.description,
        }
        const newData = await valueModel.findOneAndUpdate({}, { $push: { value: data } }, { new: true, upsert: true })
        res.status(200).json({ statusCode: 200, success: true, message: 'value  projects added successfully' })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//get
const getValue = async (req, res) => {
    try {
        const data = await valueModel.findOne({})

        res.status(200).json({ statusCode: 200, message: 'value fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update
const updateValue = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            'value.$[elem].name': req.body.name,
            'value.$[elem].title': req.body.title,
            'value.$[elem].description': req.body.description,
        };
        if (req.file && req.file.path) {
            const imagePath = req.file.path.replace(/\\/g, "/");
            const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;
            data['value.$[elem].gif'] = baseUrl;
        }
        const response = await valueModel.findOneAndUpdate(
            {},
            { $set: data },
            { arrayFilters: [{ 'elem._id': id }], new: true }
        );
        res.status(200).json({ statusCode: 200, success:true, message: 'Value project updated successfully', updateValue});
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

//delete
const deleteValue = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await valueModel.findOneAndUpdate({}, { $pull: { value: { _id: id } } }, { new: true });

        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addValue, getValue, updateValue, deleteValue }