const Content = require('../models/webModel');

//post
exports.createContent = async (req, res) => {
  try {
    const files = req.files; 
    const images = files.map(file => ({ image: file.path }));

    const newContent = await Content.create({
      heading: req.body.heading,
      subheading: req.body.subheading,
      description: req.body.description,
      buttonLink: req.body.buttonLink,
      images: images,
    });

    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get
exports.getAllContent = async (req, res) => {
    try {
      const allContent = await Content.find();
      res.status(200).json(allContent);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  //update
  exports.updateContent = async (req, res) => {
    try {
      const existingContent = await Content.findOne({ _id: req.params.id });
  
      if (existingContent) {
       
        existingContent.set(req.body);
        const updatedContent = await existingContent.save();
        res.status(200).json(updatedContent);
      } else {
    
        const newContent = await Content.create(req.body);
        res.status(201).json(newContent);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  //delete
  exports.deleteContent = async (req, res) => {
    try {
      const deletedContent = await Content.findByIdAndDelete(req.params.id);
      if (!deletedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.status(200).json({ message: 'Content deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
