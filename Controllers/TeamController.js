const teamModel = require('../Model/Team')
const mongoose = require('mongoose');
//post
const addTeam = async (req, res) => {
    try {
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const data = {
            image: baseUrl,
            name: req.body.name,
            role: req.body.role
        }
        const newData = await teamModel.findOneAndUpdate({}, { $push: { team: data } }, { new: true, upsert: true });
        return res.status(200).json({ statusCode: 200, success: true, message: 'founder added successfully' });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}



// get
const getTeam = async (req, res) => {
    try {
        const data = await teamModel.find({})

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
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }

        const { name, role } = req.body;

        const image = req.file ? req.file.path : undefined;
        const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;
  
        const update = {};
        if (name) update['team.$.name'] = name;
        if (role) update['team.$.role'] = role;
        if (baseUrl) update['team.$.image'] = baseUrl;


        const updatedTeamMember = await teamModel.findOneAndUpdate(
            { 'team._id': id },
            { $set: update },
            { new: true }
        );

        if (!updatedTeamMember) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Team member not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Team member updated successfully', teamMember: updatedTeamMember });
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
        return res.status(400).json({ statusCode: 400, message: 'Invalid Id' ,success:false});
      }
  
      await teamModel.findOneAndDelete({ _id: id });
  
      res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });
  
    } catch (error) {
      res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
  }



module.exports = { addTeam, getTeam, updateTeam, deleteTeam }