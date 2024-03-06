const aboutContent = require('../models/aboutModel');

exports.createAbout = async (req, res) => {
    try {
        const {
            marquee,
            mainDescription,
            gifContent,
            buttonLink,
            gif,
            imageCards
        } = req.body;

        const newAbout = new aboutContent({
            marquee,
            mainDescription,
            gifContent,
            buttonLink,
            gif,
            imageCards
        });

        const savedAbout = await newAbout.save();

        res.status(201).json(savedAbout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




// GET 
exports.getAllAbout = async (req, res) => {
    try {
        const aboutData = await aboutContent.find();
        res.status(200).json(aboutData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.deleteAbout = async (req, res) => {
    try {
        const deletedAbout = await aboutContent.findByIdAndDelete(req.params.id);
        if (!deletedAbout) {
            return res.status(404).json({ message: 'About content not found' });
        }
        res.status(200).json({ message: 'About content deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
