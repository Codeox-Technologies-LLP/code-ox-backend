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
        const response = await WhychooseModel.findOneAndUpdate({}, {
            $set: {
                WhyCodeOxDescription: req.body.WhyCodeOxDescription,
                WhyCodeOxHeading: req.body.WhyCodeOxHeading
            },
            $push: { WhyCodeOx: data }
        }, { new: true, upsert: true });
        return res.status(201).json({ statusCode: 201, success: true, message: "Case study added successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, success: false, message: err.message });
    }
};
/// get
const getWhychoose = async (req, res) => {
    try {
        const data = await WhychooseModel.findOne({})
        res.status(200).json({ statusCode: 200, message: 'Whychoose projects fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update 
const updateWhychoose = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            'WhyCodeOx.$[elem].WhyCodeOxHeading': req.body.name,
            'WhyCodeOx.$[elem].description': req.body.description,
            'WhyCodeOx.$[elem].WhyCodeOxDescription': req.body.WhyCodeOxDescription
        };

        if (req.file) {
            data['WhyCodeOx.$[elem].image'] = req.file.path;
        }
        const response = await WhychooseModel.findOneAndUpdate(
            { 'WhyCodeOx._id': id },
            { $set: data },
            { arrayFilters: [{ 'elem._id': id }], new: true }
        );
        res.status(200).json({ statusCode: 200, message: 'WhyCodeOxDescription projects fetched successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
//delete
const deleteWhychoose = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await WhychooseModel.findOneAndUpdate({}, { $pull: { WhyCodeOx: { _id: id } } }, { new: true });
        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addWhychoose, getWhychoose, updateWhychoose, deleteWhychoose }