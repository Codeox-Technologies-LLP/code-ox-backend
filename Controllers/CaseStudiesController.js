const caseStudiesModel = require('../Model/caseStudies');

//post
const addCaseStudies = async (req, res) => {
  try {
    const { title, subtitle,  caseStudiesDescription, link, categories } = req.body;
    const { path: imagePath } = req.file;
    const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
    const newCaseStudy = new caseStudiesModel({
      image: baseUrl,
      title,
      subtitle,
      caseStudiesDescription,
      link,
      categories
    });
    const savedCaseStudy = await newCaseStudy.save();
    res.status(201).json(savedCaseStudy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', statusCode: 500 });
  }
};


//get
const getCaseStudies = async (req, res, next) => {
  try {
    const category = req.query.category ? req.query.category.toLowerCase() : null;
    let caseStudiesData = await caseStudiesModel.find();

    // Filter the data if category is provided
    if (category) {
      caseStudiesData = caseStudiesData.filter(caseStudy =>
        caseStudy.categories.toLowerCase() === category
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
const updateCaseStudies = async (req, res, next) => {
  try {
    const newData = req.body;
    const caseStudyId = req.params.caseStudyId;


    if (req.file) {

      newData.image = req.file.path;
    }

    const updatedCaseStudies = await caseStudiesModel.findOneAndUpdate(
      { 'caseStudies._id': caseStudyId },
      { $set: { 'caseStudies.$': newData } },
      { new: true }
    );

    if (!updatedCaseStudies) {
      console.log("No case studies found for the provided ID.");
      return res.status(404).json({ statusCode: 404, success: false, message: 'No case study found for the provided ID.' });
    }
    console.log("Case study updated successfully.");
    return res.status(200).json({ statusCode: 200, success: true, message: 'Case study updated successfully.', updatedCaseStudy: updatedCaseStudies });
  } catch (err) {
    console.error("Error updating case study:", err);
    return res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};




//delete
const deleteCaseStudy = async (req, res) => {
  try {
    const caseStudyId = req.params.id; // Assuming you are passing the case study ID in the URL

    // Find and delete the case study
    const response = await caseStudiesModel.findOneAndUpdate(
      {},
      { $pull: { caseStudies: { _id: caseStudyId } } },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ statusCode: 404, success: false, message: "Case study not found" });
    }

    return res.status(200).json({ statusCode: 200, success: true, message: "Case study deleted successfully" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};

// Define your delete route




module.exports = { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy }
