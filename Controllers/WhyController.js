const WhychooseModel = require('../Model/Whychoose')

///post 
const addWhychoose = async (req, res) => {
    try {
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        console.log(req.body, req.file)
        console.log(req.body, req.file)
        const data = {
            image: baseUrl,
            // WhyCodeOxHeading: req.body.WhyCodeOxHeading,
            // WhyCodeOxDescription: req.body.WhyCodeOxDescription,
            description: req.body.description
        }
        const newData = await WhychooseModel.findOneAndUpdate({}, { $push: { WhyCodeOx: data } }, { new: true, upsert: true })
        res.status(200).json({ statusCode: 200, success: true, message: 'add projects added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
/// get
const getWhychoose = async (req, res) => {
    try {
        const data = await WhychooseModel.find({})
        console.log(data)
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
            'WhyCodeOx.$[elem].image': req.file.path,
            'WhyCodeOx.$[elem].description': req.body.description,
            'WhyCodeOx.$[elem].WhyCodeOxDescription': req.body.WhyCodeOxDescription
        }

        const response = await WhychooseModel.findOneAndUpdate(
            { 'WhyCodeOx._id': id }, // Filter the document to find the array element with this id
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