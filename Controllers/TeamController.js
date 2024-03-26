const teamModel = require('../Model/Team')
const mongoose = require('mongoose');
//post
const addTeam = async (req, res) => {
    try {
        const { path: imagePath } = req.file; // Extract the path property from req.file
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;

        const newData = await teamModel.create({
            image: baseUrl,
            name: req.body.name,
            role: req.body.role
        });

        res.status(200).json({ statusCode: 200, success: true, message: 'team added successfully' });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}


// get
const getTeam = async (req, res) => {
    try {
        const data = await teamModel.find()

        res.status(200).json({ statusCode: 200, message: 'team fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update
const updateTeam = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, success: false, message: 'Invalid ID format' });
        }

        const { name, role } = req.body;
        const image = req.file ? req.file.path : undefined;
        const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;

        const update = {
            name: name,
            role: role,
            image: baseUrl
        };
        const updatedTeam = await teamModel.findByIdAndUpdate(id, update, { new: true });

        if (!updatedTeam) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Team member not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Team member updated successfully', updatedTeam });
    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
    }
};






/// delete
const deleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }

        const response = await teamModel.findOneAndDelete({ _id: id });
        if (!response) {
            res.status(200).json({ statusCode: 404, success: true, message: "no documents were deleted" });
        }
        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { addTeam, getTeam, updateTeam, deleteTeam }