const caseStudiesModel = require('../Model/caseStudies');
const mongoose = require('mongoose');
const bgValidator = require('../middlewares/bg');
const { addImage, updateImage } = require('../middlewares/image');
//post
const addCaseStudies = async (req, res) => {
  try {
    const { title, subtitle, caseStudiesDescription, link, category, bg,titleTextColor } = req.body;

    // Validate bg color format
    if (!bgValidator.isValidColorFormat(bg)) {
      return res.status(400).json({ message: 'Invalid color format for bg field ', success: false });
    }
    //titleTextcolor
    if (!bgValidator.isValidColorFormat(titleTextColor)) {
      return res.status(400).json({ message: 'Invalid color format for bg field ', success: false });
    }


    const imageData = addImage(req);
    if (!imageData) {
      return res.status(400).json({ message: 'Error adding image' });
    }
    const newCaseStudy = new caseStudiesModel({
      image: imageData,
      title,
      subtitle,
      caseStudiesDescription,
      link,
      category,
      bg,
      titleTextColor
    });
    await newCaseStudy.save();
    res.status(200).json({ statusCode: 200, message: 'Case study added successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', statusCode: 500, success: false });
  }
};
//get
const getCaseStudies = async (req, res, next) => {
  try {
    const category = req.query.category ? req.query.category.toLowerCase() : null;
    
    // Fetch only necessary fields to reduce data transfer
    let selectFields = 'title description category'; // Customize fields as needed
    
    let query = {};
    if (category) {
      query.category = category;
    }

    let caseStudiesData = await caseStudiesModel.find(query).select(selectFields).lean();

    if (caseStudiesData.length === 0) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'No case studies found for the provided category.' });
    }

    return res.status(200).json({ statusCode: 200, success: true, caseStudies: caseStudiesData });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};

//update
const updateCaseStudies = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
    }
    const { title, subtitle, caseStudiesDescription, link, categories, bg,titleTextColor } = req.body;
    const { category } = req.body;
    const image = updateImage(req)
    const update = {
      image: image,
      category: category,
      title,
      subtitle,
      caseStudiesDescription,
      link,
      bg,
      titleTextColor
      
    };

    const updatedCaseStudies = await caseStudiesModel.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!updatedCaseStudies) {
      return res.status(404).json({ statusCode: 404, success:false, message: 'Case Studies not found' });
    }

    res.status(200).json({ statusCode: 200, success: true, message: 'Case studies updated successfully', updatedCaseStudies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
  }
};
//delete
const deleteCaseStudy = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id' ,success:false});
    }
    await caseStudiesModel.findOneAndDelete({ _id: id });
    res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}

module.exports = { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy }
