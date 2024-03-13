const showreelModel = require('../Model/showreel')

const addshowreel = async (req, res) => {
    try {
        const { showreelHeading, showreeldescripation, showreelheading1, showreeldescripation1 } = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const newShowreelItem = new showreelModel({
            showreel: [{
                image: image.path,
                showreelHeading,
                showreeldescripation,
                showreelheading1,
                showreeldescripation1
            }]
        });
        const savedShowreelItem = await newShowreelItem.save();
        res.status(201).json(savedShowreelItem);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//get 
const getShowreelItems = async (req, res) => {
    try {
        const showreelItems = await showreelModel.find();
        res.status(200).json(showreelItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//updte
const updateShowreel = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Requested ID:', id);
        
        const { showreelHeading, showreeldescripation, showreelheading1, showreeldescripation1 } = req.body;
        console.log('Updated data:', req.body);

        const image = req.file;
        console.log('Image:', image);

        if (!image) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const updatedShowreelItem = await showreelModel.findOneAndUpdate(
            { _id: id, 'showreel._id': id }, // Match both the document ID and the nested subdocument ID
            {
                $set: {
                    'showreel.$[elem].image': image.path,
                    'showreel.$[elem].showreelHeading': showreelHeading,
                    'showreel.$[elem].showreeldescripation': showreeldescripation,
                    'showreel.$[elem].showreelheading1': showreelheading1,
                    'showreel.$[elem].showreeldescripation1': showreeldescripation1
                }
            },
            { new: true, arrayFilters: [{ 'elem._id': id }] } // Filter the array element by its ID
        );

        if (!updatedShowreelItem) {
            return res.status(404).json({ message: 'Showreel item not found' });
        }

        res.status(200).json(updatedShowreelItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//detle
const deleteShowreel = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the showreel item by its ID and delete it
        const deletedShowreelItem = await showreelModel.findOneAndDelete({ 'showreel._id': id });

        if (!deletedShowreelItem) {
            return res.status(404).json({ message: 'Showreel item not found' });
        }

        res.status(200).json({ message: 'Showreel item deleted successfully', deletedItem: deletedShowreelItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};






module.exports = { addshowreel, getShowreelItems, updateShowreel,deleteShowreel  }