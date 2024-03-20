const showreelModel = require('../Model/showreel')

const addshowreel = async (req, res) => {
    try {
        const { showreelHeading, showreeldescripation, showreelheading1, showreeldescripation1, categories, link } = req.body;
        const images = req.files.map(file => {
            // Construct image URL
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${file.filename}`;
            return imageUrl;
        });

        // Create a new showreel item
        const newShowreelItem = new showreelModel({
            image: images,
            showreelHeading,
            showreeldescripation,
            showreelheading1,
            showreeldescripation1,
            categories,
            link
        });

        const savedShowreelItem = await newShowreelItem.save();
        res.status(201).json(savedShowreelItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', statusCode: 500 });
    }
};

//get 
const getShowreelItems = async (req, res, next) => {
    try {
        const category = req.query.categories ? req.query.categories.toLowerCase() : null;
        let showreelData = await showreelModel.find();

        // Filter the data
        if (category) {
            showreelData = showreelData.filter(item => item.categories.toLowerCase() === category.toLowerCase()
            );
        }


        if (showreelData.length === 0) {
            return res.status(404).json({
                statusCode: 404, success: false, message: 'No showreel items found for the provided category.'
            });
        }

        return res.status(200).json({
            statusCode: 200, success: true, showreelItems: showreelData
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500, success: false, message: err.message
        });
    }
};


//updte
const updateShowreel = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Requested ID:', id);

        const { showreelHeading, showreeldescripation, showreelheading1, showreeldescripation1, categories, link } = req.body;
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
                    'showreel.$[elem].showreeldescripation1': showreeldescripation1,
                    'showreel.$[elem].categories': categories,
                    'showreel.$[elem].link': link // Corrected from ' link' to 'link'
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
        res.status(500).json({ message: 'Server Error', statusCode: 500 });
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






module.exports = { addshowreel, getShowreelItems, updateShowreel, deleteShowreel }