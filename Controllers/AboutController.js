const AboutModel = require('../Model/About');
const mongoose = require('mongoose');

//POST 

const addAbout = async (req, res) => {
  try {
    const { path: imagePath } = req.file; // Extract the path property from req.file
    const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
    if (!imagePath) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const data = {
      image: baseUrl,
      welcomeContent: req.body.welcomeContent,
      description: req.body.description,
      buttonText: req.body.buttonText,
      link: req.body.link,
      marquee: req.body.marquee
    }
    const newAbout = await AboutModel.create(data);
    res.status(201).json(newAbout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};

//GET

const getAbout = async (req, res) => {
  try {
    const data = await AboutModel.findOne();
  
    res.status(200).json({ statusCode: 200, message: 'About projects fetched successfully', data: data });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};


//UPDATE

const updateAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const { welcomeContent, description, buttonText, link, marquee } = req.body;

 
    const image = req.file ? req.file.path : undefined;
    const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;
    const update = {
      image: baseUrl,
      welcomeContent,
      description,
      buttonText,
      link,
      marquee
    };

    // Update the document in the database
    const updatedAbout = await AboutModel.findOneAndUpdate(
      {  }, 
      update, 
      { new: true } 
    );

    // If no document is found for the provided ID, return a 404 response
    if (!updatedAbout) {
      return res.status(404).json({ statusCode: 404, message: 'About not found' });
    }

    // Return a success response with the updated document
    res.status(200).json({ statusCode: 200, success: true, message: 'About updated successfully', updatedAbout });
  } catch (error) {
    // Log the error to the console for debugging
    console.error(error);
    // Return a 500 response with an error message
    res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error', error: error.message });
  }
};







//DELETE

const deleteAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await AboutModel.findOneAndUpdate({}, { $pull: { about: { _id: id } } }, { new: true });

    res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}


module.exports = { addAbout, getAbout, updateAbout, deleteAbout }

