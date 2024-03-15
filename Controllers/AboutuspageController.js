const AboutsModel = require('../model/Aboutus');
//post

const addAboutus = async (req, res) => {
    try {

        const heading = req.body.heading;
        const shortDescripation = req.body.shortDescripation;
        const descripation = req.body.descripation;
        const newAboutus = { heading, shortDescripation,descripation };
        const newAbout = await AboutsModel.create({
            aboutUs: [newAboutus]
        });
        res.status(201).json(newAbout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



//get
const getAboutus = async (req, res) => {
    try {
        const data = await AboutsModel.find({})
        console.log(data)
        res.status(200).json({ statusCode: 200, success: true, message: ' TermsAndCondition  fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


//upadte
const updateAboutus = async (req, res) => {
    try {
        const faqId = req.params.id;
        const data = {
            'faq.$[elem].question': req.body.question,
            'faq.$[elem].answer': req.body.answer,
        };
        const response = await AboutsModel.findOneAndUpdate(
            { 'faq._id': faqId }, // Use 'faq._id' as the filter condition
            { $set: data }, 
            { arrayFilters: [{ 'elem._id': faqId }], new: true }
        );

        res.status(200).json({ statusCode: 200, message: 'terms and condition updated', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};

//delete
const deleteAboutus = async (req, res) => {
    try {
        const faqId = req.params.id;
        const deletedFAQ = await AboutsModel.findByIdAndDelete(faqId);
        if (!deletedFAQ) {
            return res.status(404).json({ message: 'deleted' });
        }
        res.json(deletedFAQ);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = { addAboutus, getAboutus, deleteAboutus, updateAboutus }