const Catergories = require('../models/webModel');

//post
exports.createCatergories = async (req, res) => {
  try {
    if (!req.file || req.file.length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }
    const image = req.file.path;
    const newCatergories = await Catergories.create({
      heading: req.body.heading,
      subheading: req.body.subheading,
      description: req.body.description,
      buttonLink: req.body.buttonLink,
      image: image,
    });
    res.status(201).json({ success: true, statusCode: 200, message: 'webCatergories created successfully', data: newCatergories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//get
exports.getAllCatergories = async (req, res) => {
  try {
    const allCatergories = await Catergories.find();
    res.status(200).json({ statusCode: 200, success: true, message: "Successfully retrieved all Catergories", data: allCatergories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//update

exports.updateCatergories = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body, req.file, req.params.id);
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }
    const updatedFields = {
      image: req.file.path,
      heading: req.body.heading,
      subheading: req.body.subheading,
      description: req.body.description,
      buttonLink: req.body.buttonLink
    };

    // Update the Catergories with the new values
    const updatedCatergories = await Catergories.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    // Check if Catergories is found and updated
    if (updatedCatergories) {
      res.status(200).json({ success: true, statusCode: 200, message: "Catergories updated successfully", data: updatedCatergories });
    } else {
      // Catergories not found with the provided ID
      res.status(404).json({ success: false, message: "Catergories not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//delete
exports.deleteCatergories = async (req, res) => {
  try {
    const deletedCatergories = await Catergories.findByIdAndDelete(req.params.id);
    if (!deletedCatergories) {
      return res.status(404).json({ success: false, statusCode:404, message: 'Catergories not found' });
    }
    res.status(200).json({ success: true, statusCode: 200, message: 'Catergories deleted successfully' });
  } catch (err) {
    res.status(500).json({ statusCode:500 ,message: 'Internal server error', });
  }
};


