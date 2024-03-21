const projectModel = require('../Model/ProjectCount')

const addProject = async (req, res) => {
    try {

        const data = {
            projectHappyClient: req.body.projectHappyClient,
            projectTaskDone: req.body.projectTaskDone,
            projectCompleted: req.body.projectCompleted,
        }

        const newData = await projectModel.findOneAndUpdate({}, { $push: { value: data } }, { new: true, upsert: true })

        res.status(200).json({ statusCode: 200, success: true, message: ' projects count added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//get

const getProject = async (req, res) => {
    try {
        const data = await valueModel.find({})
       
        res.status(200).json({ statusCode: 200, message: 'value fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateProject = async (req, res) => {
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
const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await valueModel.findOneAndUpdate({}, { $pull: { value: { _id: id } } }, { new: true });

        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { addProject, getAbout, updateAbout, deleteAbout }