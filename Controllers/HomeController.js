const homeModel = require('../Model/Home');
const { updateImage } = require('../middlewares/image');

//post
const addHome = async (req, res) => {
    try {
        const id = req.params.id;
        const imagePath = updateImage(req);
        let data = {};
        data = req.body
        if (imagePath) {
            data['image'] = imagePath;
        }
        const filter = { _id: id };
        await homeModel.findOneAndUpdate(
            filter,
            { $set: data },
            { new: true }
        );
        res.status(200).json({
            statusCode: 200,
            message: 'Home Hero updated',
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}



//get
const getHome = async (req, res) => {
    try {
        const data = await homeModel.findOne()

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