const AboutModel = require('../Model/About');

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
      aboutContent: req.body.aboutContent,
      descripation: req.body.descripation,
      aboutButton: req.body.aboutButton,
      link: req.body.link,
      heading: req.body.heading ,
      heading1: req.body.heading1 ,
      marquee:req.body.marquee
      
      

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
    console.log(data);
    res.status(200).json({ statusCode: 200, message: 'About projects fetched successfully', data: data });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};


//UPDATE
const updateAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      'about.$[elem].descripation': req.body.descripation, 
      'about.$[elem].image': req.file.path,
      'about.$[elem].aboutContent': req.body.aboutContent,
      'about.$[elem].aboutButton': req.body.aboutButton,
      'about.$[elem].aboutButtonLink': req.body.aboutButtonLink,
      'about.$[elem].heading': req.body.heading,
      'about.$[elem].heading1': req.body.heading1,
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