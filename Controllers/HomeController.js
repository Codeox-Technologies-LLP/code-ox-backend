const homeModel = require('../Model/Home');

//post
const addHome = async (req, res) => {
    try {
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
           return res.status(400).json({ message: 'Image file is required' });
        }
   
        const data = {
            image: baseUrl,
            heading: req.body.heading,
            subHeading: req.body.subHeading,
            marqueeText: req.body.marqueeText
        }
        const newData = await homeModel.findOneAndUpdate({},data, { new: true, upsert: true })
        res.status(200).json({ statusCode: 200, success: true, message: 'home added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//get
const getHome = async (req, res) => {
    try {
        const data = await homeModel.find({})
        console.log(data)
        res.status(200).json({ statusCode: 200, message: 'home  fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


const deleteHome = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await homeModel.findOneAndUpdate({}, { $pull: { hero: { _id: id } } }, { new: true });

        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { addHome, getHome, deleteHome }