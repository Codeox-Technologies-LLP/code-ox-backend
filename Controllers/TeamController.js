const teamModel = require('../Model/Team')

//post
const addTeam = async (req, res) => {
    try {
        console.log(req.body, req.file)
        const data = {
            image: req.file.path,
        }
        const newData = await teamModel.findOneAndUpdate({}, { $push: { team: data } }, { new: true, upsert: true })

        res.status(200).json({ statusCode: 200, success: true, message: 'team added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

// get
const getTeam = async (req, res) => {
    try {
        const data = await teamModel.find({})
        console.log(data)
        res.status(200).json({ statusCode: 200, message: 'team fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update
const updateTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            'team.$[elem].image': req.file.path,
            // Add other fields you want to update here
        };

        const response = await teamModel.findOneAndUpdate(
            { 'team._id': id }, // Filter condition to match the team with the given ID
            { $set: data },
            { arrayFilters: [{ 'elem._id': id }], new: true }
        );

        res.status(200).json({ statusCode: 200, message: 'Team member updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};



/// delete
const deleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await teamModel.findOneAndUpdate({}, { $pull: { team: { _id: id } } }, { new: true });

        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { addTeam, getTeam, updateTeam, deleteTeam }