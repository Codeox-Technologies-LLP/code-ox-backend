const { addImage, updateImage } = require('../middlewares/image');

const erpModel = require('../Model/Erp');
const mongoose = require('mongoose');




//POST 

const addProjects = async (req, res) => {
  try {
    const imageData = addImage(req);
    if (!imageData) {
      return res.status(400).json({ message: 'Error adding image' });
    }

    const data = {
      image: imageData,
      name: req.body.name,
      description: req.body.description
    };

    const newData = erpModel(data);
    const savedData = await newData.save()

    res.status(200).json({ statusCode: 200, success: true, message: 'erp projects added successfully' });

  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};

//GET

const getProjects = async (req, res) => {
  try {

    const data = await erpModel.find({})

    res.status(200).json({ statusCode: 200, message: 'erp projects fetched successfully', data: data })
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}

//UPDATE

const updateProjects = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
    }
    const { name, description } = req.body;

    const image = updateImage(req)
    const update = {
      image: image,
      name,
      description

    };

    const updatedProject = await erpModel.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'project not found' });
    }

    res.status(200).json({ statusCode: 200, success: true, message: 'project updated successfully', updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
  }
};




//DELETE

const deleteProjects = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id', success: false });
    }

    await erpModel.findOneAndDelete({ _id: id });

    res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}

module.exports = { addProjects, getProjects, updateProjects, deleteProjects }