const valueModel = require('../Model/Ourvalue')
//post
const addValue = async (req, res) => {
    try {
        console.log(req.body, req.file)
        const data = {
            name: req.body.name,
            gif: req.file.path,
            title: req.body.title,
            descripation: req.body.descripation,
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
        const data = await valueModel.find({})
        console.log(data)
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
            'value.$[elem].gif': req.file.path,
            'value.$[elem].title': req.body.title,
            'value.$[elem].descripation': req.body.descripation,

        }

        const response = await valueModel.findOneAndUpdate({}, { $set: data }, { arrayFilters: [{ 'elem._id': id }], new: true })

        res.status(200).json({ statusCode: 200, message: 'value projects fetched successfully' })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

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