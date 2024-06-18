const HeroModel = require("../Model/AboutHero");
const { updateImage } = require("../middlewares/image");

const updateAboutHero = async (req, res) => {
    try {
        const id = req.params.id;
        const imagePath = updateImage(req);
        let data = {};
        data = req.body
        if (imagePath) {
            data['image'] = imagePath;
        }
        const filter = { _id: id };
        await HeroModel.findOneAndUpdate(
            filter,
            { $set: data },
            { new: true }
        );
        res.status(200).json({
            statusCode: 200,
            message: 'About Hero updated',
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}



const getAboutHero = async (req, res) => {
    try {
        const data = await HeroModel.findOne()

        res.status(200).json({ statusCode: 200, message: 'hero fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { updateAboutHero,getAboutHero}