const MarqueeModel = require('../Model/Marquee');
//post
const addMarquee = async (req, res) => {
    try {
        const heading = req.body.heading;


        if (!heading) {
            return res.status(400).json({ message: 'Heading is required in the request body' });
        }

        const newMarquee = await MarqueeModel.create({
            Marquee: [{ heading: heading }]
        });
        res.status(201).json(newMarquee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


//get
const getMarquee = async (req, res) => {
    try {
        const data = await MarqueeModel.find({})
        console.log(data)
        res.status(200).json({ statusCode: 200, success: true, message: ' marquee  fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


//upadte
const updateMarquee = async (req, res) => {
    try {
        const marqueeId = req.params.id;
        const data = {
            'Marquee.$[elem].heading': req.body.heading,
        };

        const response = await MarqueeModel.findOneAndUpdate(
            { 'Marquee._id': marqueeId },
            { $set: data },
            { arrayFilters: [{ 'elem._id': marqueeId }], new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Marquee not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Marquee updated', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};


//delete
const deleteMarquee = async (req, res) => {
    try {
        const marqueeId = req.params.id;
        const deletedMarquee = await MarqueeModel.findByIdAndDelete(marqueeId);
        if (!deletedMarquee) {
            return res.status(404).json({ message: 'Marquee not found' });
        }
        res.json({ message: 'Marquee deleted successfully', deletedMarquee });
    } catch (error) {
        console.error("Error deleting Marquee:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = { addMarquee, getMarquee, deleteMarquee, updateMarquee }