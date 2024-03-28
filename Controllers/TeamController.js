const teamModel = require('../Model/Team')
const mongoose = require('mongoose');
//post
const addTeam = async (req, res) => {
    try {
        const { path: imagePath } = req.file; 
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;   
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const data = {
            image: baseUrl,
            name: req.body.name,
            role: req.body.role
        };
        const newTeam = await teamModel.create(data);
        res.status(200).json({ statusCode: 200, success: true, message: 'team added successfully', data: newTeam });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
// get
const getTeam = async (req, res) => {
    try {
        const data = await teamModel.find({})     
        res.status(200).json({ statusCode: 200, success:true, message: 'Team fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update
const updateTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const baseUrl = `${req.protocol}://${req.get('host')}/`;  
        const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : '';
        const data = {
            image: req.file ? baseUrl + imagePath : undefined, 
            name: req.body.name,
            role: req.body.role
        };
        const response = await teamModel.findByIdAndUpdate(id, data, { new: true });
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: "No team found with the provided ID" });
        }
        res.status(200).json({ statusCode: 200, success:true, message: 'team updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
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