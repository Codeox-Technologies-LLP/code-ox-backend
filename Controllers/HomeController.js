const homeModel = require('../Model/Home');

const addHome = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);
        const image = req.file ? req.file.path : null;
        //hero
        if (!req.body.hero) {
            req.body.hero = [];
        }
        const newHero = {
            image: image,
            heading: req.body.heading,
            subHeading: req.body.subHeading,
        };
        req.body.hero.push(newHero);
        //service
        if (!req.body.services) {
            req.body.services = [];
        }
        const newServices = {
            image: image,
            servicesHeading: req.body.servicesHeading,
            servicesDescripation: req.body.servicesDescripation,
            WhyCodeOxHeading: req.body.WhyCodeOxHeading,
            WhyCodeOxDescription: req.body.WhyCodeOxDescription
        };
        req.body.services.push(newServices);
        //why code-ox
        if (!req.body.WhyCodeOx) {
            req.body.WhyCodeOx = [];
        }
        const newWhyCodeOx = {
            image: image,
            description: req.body.description,
        };
        req.body.WhyCodeOx.push(newWhyCodeOx);

        ///testimonial
        if (!req.body.Testimonials) {
            req.body.Testimonials = [];
        }
        const newTestimonial = {
            image: image,
            testimonialsdescription: req.body.testimonialsdescription,
            authorName: req.body.authorName,
            authorCompany: req.body.authorCompany,

        };
        req.body.Testimonials.push(newTestimonial);
        ///key website coleection
        if (!req.body.KeyWebsiteCollections) {
            req.body.KeyWebsiteCollections = [];
        }
        const newKeyWebsiteCollections = {
            KeyWebsiteCollectionsHeading: req.body.KeyWebsiteCollectionsHeading,
            KeyWebsiteCollectionsDescription: req.body.KeyWebsiteCollectionsDescription,
            image: image,
        };
        req.body.KeyWebsiteCollections.push(newKeyWebsiteCollections);
        //client
        if (!req.body.Client) {
            req.body.Client = [];
        }
        const newClient = {
            image: image,
            categories: req.body.categories
        };
        req.body.Client.push(newClient);
        //about
        if (!req.body.about) {
            req.body.about = [];
        }
        const newAbout = {
            aboutContent: req.body.aboutContent,
            image: image,
            content: req.body.content,
            aboutButton: req.body.aboutButton,
            aboutButtonLink: req.body.aboutButtonLink,
        };
        req.body.about.push(newAbout);
        console.log("Updated newHomeData:", req.body);
        const newHome = new homeModel(req.body);
        const savedHome = await newHome.save();
        console.log("Saved Home:", savedHome);
        res.status(201).json(savedHome);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};


///get method
const getHome = async (req, res) => {
    try {
        const homes = await homeModel.find();
        res.status(200).json(homes);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



///delte method
const deleteById = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedHome = await homeModel.findByIdAndDelete(id);
        if (deletedHome) {
            return res.status(404).json({ message: "Home not found" });
        }
        console.log("Deleted Home:", deletedHome);
        res.status(200).json({ message: "Home deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

//update
const updatedHome = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        console.log("Updating home document with ID:", id);
        console.log("Updated data:", updatedData);

      
        const existingHome = await homeModel.findById(id);
        if (!existingHome) {
            return res.status(404).json({ message: "Home document not found" });
        }

    
        let imagePath = existingHome.image; 
        if (req.file) {
            imagePath = req.file.path;
         
            updatedData.image = imagePath;
        }

        const updatedDocument = await homeModel.findByIdAndUpdate(
            id,
            { ...updatedData, image: imagePath }, 
            { new: true }
        );

        console.log("Updated home document:", updatedDocument);

    
        if (!updatedDocument) {
            return res.status(404).json({ message: "Failed to update home document" });
        }

        
        res.status(200).json(updatedDocument);
    } catch (err) {
        console.error("Error updating home document:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};











module.exports = { addHome, getHome, updatedHome };
