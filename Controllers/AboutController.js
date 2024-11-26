const AboutModel = require('../Model/About');
const mongoose = require('mongoose');

//POST 

const addAbout = async (req, res) => {
  try {
    const imageData = addImage(req);
    if (!imageData) {
      return res.status(400).json({ message: 'Error adding image' });
    }

    const data = {
      image: imageData,
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
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
    }
    const { welcomeContent, description, buttonText, link, marquee } = req.body || {};
    const imagePath = req.file?.path;

    const update = {};

    // Only update fields that are provided in the request
    if (welcomeContent) update.welcomeContent = welcomeContent;
    if (description) update.description = description;
    if (buttonText) update.buttonText = buttonText;
    if (link) update.link = link;
    if (imagePath) update.image = imagePath;
    if (marquee) update.marquee = marquee;

    if (imagePath) {
      const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
      update.image = baseUrl;
    }

    // Update the About document
    const updatedAbout = await AboutModel.findByIdAndUpdate(id, update, { new: true });

    if (!updatedAbout) {
      return res.status(404).json({ statusCode: 404, message: 'About not found', id });
    }

    res.status(200).json({ statusCode: 200, success: true, message: 'About updated successfully', updatedAbout });
  } catch (error) {
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

