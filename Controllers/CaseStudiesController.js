const caseStudiesModel = require('../Model/caseStudies');
const mongoose = require('mongoose');
const bgValidator = require('../middlewares/bg');
//post
const addCaseStudies = async (req, res) => {
  try {
    const { title, subtitle, caseStudiesDescription, link, category, bg } = req.body;
    if (!bgValidator.isValidColorFormat(bg)) {
      return res.status(422).json({ message: 'Invalid color format for bg field ', success: false , statusCode:422});
    }

    if (!title || !subtitle || !caseStudiesDescription || !link || !category || !bg || !req.file) {
      return res.status(400).json({ message: 'Missing required fields', statusCode: 400, success: false });
  }
    const { path: imagePath } = req.file;
    const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
    const newCaseStudy = new caseStudiesModel({
      image: baseUrl,
      title,
      subtitle,
      caseStudiesDescription,
      link,
      category,
      bg
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
    let caseStudiesData = await caseStudiesModel.find();
    if (category) {
      caseStudiesData = caseStudiesData.filter(caseStudy =>
        caseStudy.category.toLowerCase() === category
      );
    }
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
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id' , success:false });
    }
    const { title, subtitle, caseStudiesDescription, link, categories, bg } = req.body;
    const { category } = req.body;
    const image = req.file ? req.file.path : undefined; // Check if req.file exists
    const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;
    const update = {
      image: baseUrl,
      category: category,
      title,
      subtitle,
      caseStudiesDescription,
      link,
      bg
    };
    const updatedCaseStudies = await caseStudiesModel.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );
    if (!updatedCaseStudies) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'Case Studies not found' });
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
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id', success: false });
    }
    await caseStudiesModel.findOneAndDelete({ _id: id });
    res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}

module.exports = { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy }
