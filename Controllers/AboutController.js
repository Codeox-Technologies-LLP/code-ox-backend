const AboutModel = require('../Model/About');

//POST 

const addAbout = async (req, res) => {
  try {
    const { path: imagePath } = req.file; // Extract the path property from req.file
    const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
    if (!imagePath) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    console.log(req.body, req.file)
    const data = {
      image: baseUrl,
      aboutContent: req.body.aboutContent,
      descripation: req.body.descripation,
      aboutButton: req.body.aboutButton,
      aboutButtonLink: req.body.aboutButtonLink,
    }

    const newData = await AboutModel.findOneAndUpdate({}, { $push: { about: data } }, { new: true, upsert: true })

    res.status(200).json({ statusCode: 200, success: true, message: 'about projects added successfully' })

  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}

//GET

const getAbout = async (req, res) => {
  try {
    const data = await AboutModel.find({})
    console.log(data)
    res.status(200).json({ statusCode: 200, message: 'about projects fetched successfully', data: data })
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}

//UPDATE
const updateAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      'about.$[elem].descripation': req.body.descripation, // Corrected field name
      'about.$[elem].image': req.file.path,
      'about.$[elem].aboutContent': req.body.aboutContent,
      'about.$[elem].aboutButton': req.body.aboutButton,
      'about.$[elem].aboutButtonLink': req.body.aboutButtonLink,
    }

    const response = await AboutModel.findOneAndUpdate({}, { $set: data }, { arrayFilters: [{ 'elem._id': id }], new: true })

    res.status(200).json({ statusCode: 200, message: 'about section updated successfully' })
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}


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

//   /about/:id'