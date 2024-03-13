const AboutModel = require('../Model/About');

///add about
const addAbout = async (req, res) => {
    try {
      const newAbout = new AboutModel(req.body);
      await newAbout.save();
      res.status(201).json(newAbout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  
  // GET method to fetch all about sections
  const getAbout = async (req, res) => {
    try {
      const aboutSections = await AboutModel.find();
      res.json(aboutSections);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // put method
  const updateAbout = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAbout = await AboutModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedAbout) {
        return res.status(404).json({ message: 'About section not found' });
      }
      res.json(updatedAbout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  ///deltet

  const deleteAbout = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAbout = await AboutModel.findByIdAndDelete(id);
      if (!deletedAbout) {
        return res.status(404).json({ message: 'About section not found' });
      }
      res.json({ message: 'About section deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

module.exports ={addAbout,getAbout,updateAbout,deleteAbout}

//   /about/:id'