const Content = require('../models/webModel');

//post
exports.createContent = async (req, res) => {
  try {
    if (!req.file || req.file.length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }
    const image = req.file.path;
    const newContent = await Content.create({
      heading: req.body.heading,
      subheading: req.body.subheading,
      description: req.body.description,
      buttonLink: req.body.buttonLink,
      image: image,
    });
    res.status(201).json({ success: true, statusCode: 200, message: 'Content created successfully', data: newContent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//get
exports.getAllContent = async (req, res) => {
  try {
    const allContent = await Content.find();
    res.status(200).json({ statusCode: 200, success: true, message: "Successfully retrieved all content", data: allContent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//update

exports.updateContent = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body, req.file, req.params.id); // Log the request body, file, and ID

    // Check if an image file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    // Create an object with updated fields
    const updatedFields = {
      image: req.file.path,
      heading: req.body.heading,
      subheading: req.body.subheading,
      description: req.body.description,
      buttonLink: req.body.buttonLink
    };

    // Update the content with the new values
    const updatedContent = await Content.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    // Check if content is found and updated
    if (updatedContent) {
      res.status(200).json({ success: true, statusCode: 200, message: "Content updated successfully", data: updatedContent });
    } else {
      // Content not found with the provided ID
      res.status(404).json({ success: false, message: "Content not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//delete
exports.deleteContent = async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    res.status(200).json({ success: true, statusCode: 200, message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


