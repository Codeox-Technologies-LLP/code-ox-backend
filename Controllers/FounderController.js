const founderModel = require('../Model/Founder')

//post 
const addFounder = async (req, res) => {
    try {
        console.log(req.body, req.file)
        const data = {
            image: req.file.path,
            name: req.body.name,
            position: req.body.position,
            role: req.body.role
        }

        const newData = await founderModel.findOneAndUpdate({}, { $push: { founder: data } }, { new: true, upsert: true })

        res.status(200).json({ statusCode: 200, success: true, message: 'founder  added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//get
const getFounder = async (req, res) => {
    try {
        const data = await founderModel.find({})
        console.log(data)
        res.status(200).json({ statusCode: 200, message: 'founder fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateFounder = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            'founder.$[elem].image': req.file.path,
            'founder.$[elem].name': req.body.name,
            'founder.$[elem].position': req.body.position,
            'founder.$[elem].role': req.body.role
        }

        const response = await founderModel.findOneAndUpdate(
            { 'founder._id': id }, // Filter condition to match the founder with the given ID
            { $set: data }, 
            { arrayFilters: [{ 'elem._id': id }], new: true }
        );

        res.status(200).json({ statusCode: 200, message: 'Founder updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}

///delete
const deleteFounder = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await founderModel.findOneAndUpdate({}, { $pull: { founder: { _id: id } } }, { new: true });

        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
module.exports = { addFounder, getFounder, updateFounder, deleteFounder }