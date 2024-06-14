const AboutodooModel = require('../Model/AboutOdoo')


//POST

const addAboutOdoo = async (req,res) => {
    try {
        const data = {
            title: req.body.title,
            list: req.body.list,
        }
        const newAboutOdoo = new AboutodooModel(data);
        const savedAboutOdoo = await newAboutOdoo.save();
        return res.status(201).json({
            statusCode: 201, 
            success: true, 
            message: "Aboutodoo added successfully", 
            data: savedAboutOdoo
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500, 
            success: false, 
            message: err.message 
        })
    }
};

//get
const getAboutOdoo = async (req,res) => {
    try {
        const data = await AboutodooModel.find({})
        res.status(200).json({ statusCode: 200, message: 'AboutOdoo fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update

const updateAboutOdoo = async (req,res) => {
    try {
        const id = req.params.id;
        let data = {};

        if (req.body.title) data['title'] = req.body.title;
        if (req.body.list) data['list'] = req.body.list;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ statusCode: 400, success: false, message: 'No data provided to update' });
        }

        const response = await AboutodooModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }  // Ensure validators are run on update
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Aboutodoo not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Aboutodoo updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

//DELETE

const deleteAboutodoo = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await AboutodooModel.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'AboutOdoo not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'AboutOdoo deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }

};

module.exports = { addAboutOdoo, getAboutOdoo, updateAboutOdoo, deleteAboutodoo }



    
    
