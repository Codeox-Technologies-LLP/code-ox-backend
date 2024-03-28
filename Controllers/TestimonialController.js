const testimonialModel = require('../Model/Testimonial')
const {addImage ,updateImage}= require ('../middlewares/image')

//post
const addTestimonial = async (req, res) => {
    try {
    
        const imageData = addImage(req);
        if (!imageData) {
          return res.status(400).json({ message: 'Error adding image' });
        }

        const data = {
            image: imageData,
            authorName: req.body.authorName,
            authorCompany: req.body.authorCompany,
            testimonialsdescription: req.body.testimonialsdescription
        };
        const newTestimonial = new testimonialModel(data);
        await newTestimonial.save();
        res.status(200).json({ statusCode: 200, success: true, message: 'Testimonial added successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: 'Server Error' });
    }
};
//get
const getTestimonial = async (req, res) => {
    try {
        const data = await testimonialModel.find()
    
        res.status(200).json({ statusCode: 200, message: 'testimonial fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update
const updateTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const imagePath = req.file ? req.file.path : null;
        let data = {};
        if (imagePath) {
            const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
            data['image'] = baseUrl;
        }
        if (req.body.authorName) data['authorName'] = req.body.authorName;
        if (req.body.authorCompany) data['authorCompany'] = req.body.authorCompany;
        if (req.body.testimonialsdescription) data['testimonialsdescription'] = req.body.testimonialsdescription;
        const response = await testimonialModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ statusCode: 200, success:true, message: 'Testimonial updated successfully', updateTestimonial });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success:false, message: error.message });
    }
};
//delte
const deleteTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await testimonialModel.findOneAndDelete({ _id: id });
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Testimonial deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};



module.exports = { addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial }