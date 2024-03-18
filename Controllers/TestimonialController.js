const testimonialModel = require('../Model/Testimonial')

//post
const addTestimonial = async (req, res) => {
    try {
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        console.log(req.body, req.file)
        console.log(req.body, req.file)
        const data = {
            image: baseUrl,
            authorName: req.body.authorName,
            authorCompany: req.body.authorCompany,
            testimonialsdescription: req.body.testimonialsdescription
        }

        const newData = await testimonialModel.findOneAndUpdate({}, { $push: { testimonial: data } }, { new: true, upsert: true })

        res.status(200).json({ statusCode: 200, success: true, message: 'testimonial added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//gegt
const getTestimonial = async (req, res) => {
    try {
        const data = await testimonialModel.find({})
        console.log(data)
        res.status(200).json({ statusCode: 200, message: 'testimonial fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
//update
const updateTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            'testimonial.$.authorName': req.body.authorName,
            'testimonial.$.image': req.file.path,
            'testimonial.$.authorCompany': req.body.authorCompany,
            'testimonial.$.testimonialsdescription': req.body.testimonialsdescription
        }

        const response = await testimonialModel.findOneAndUpdate(
            { 'testimonial._id': id }, // Targeting the specific testimonial using its _id
            { $set: data },
            { new: true }
        );

        res.status(200).json({ statusCode: 200, message: 'Testimonial updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}
//delte
const deleteTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await testimonialModel.findOneAndUpdate(
            {},
            { $pull: { testimonial: { _id: id } } },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Testimonial not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Testimonial deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}


module.exports = { addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial }