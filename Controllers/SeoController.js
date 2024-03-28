const Seo = require('../Model/Seo');

const addSeo = async (req, res) => {
  try {
    const seo = new Seo(req.body);
    const newSeo = await seo.save();
    res.status(201).json({ statusCode: 201, success: true, message: 'SEO added successfully', data: newSeo });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ statusCode: 400, success: false, message: error.message });
    }
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};

const getSeo = async (req, res) => {
  try {
    const seo = await Seo.find();
    res.status(200).json({ statusCode: 200, success: true, data: seo });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};

const updateSeo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, keywords, page } = req.body;
    const data = {};

    if (title) data.title = title.trim();
    if (description) data.description = description.trim();
    if (keywords) data.keywords = keywords.trim();
    if (page) data.page = page.trim();

    const response = await Seo.findByIdAndUpdate(id, { $set: data }, { new: true });

    if (!response) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'SEO not found' });
    }

    res.status(200).json({ statusCode: 200, success: true, message: 'SEO updated successfully', data: response });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ statusCode: 400, success: false, message: error.message });
    }
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};

const deleteSeo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Seo.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'SEO not found' });
    }

    res.status(200).json({ statusCode: 200, success: true, message: 'SEO deleted successfully' });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};


module.exports = { addSeo, getSeo, updateSeo, deleteSeo };