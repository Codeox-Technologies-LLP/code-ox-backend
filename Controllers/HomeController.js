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
    try {
        console.log("Incoming request body:", req.body);
        const image = req.file ? req.file.path : null;

        // Update hero array items
        if (req.body.hero) {
            await homeModel.findOneAndUpdate(
                { 'hero': { $elemMatch: { _id: req.body.hero._id } } },
                { $set: { 'hero.$': req.body.hero } }
            );
        }

        // Update services array items
        if (req.body.services) {
            await homeModel.findOneAndUpdate(
                { 'services': { $elemMatch: { _id: req.body.services._id } } },
                { $set: { 'services.$': req.body.services } }
            );
        }

        // Update WhyCodeOx array items
        if (req.body.WhyCodeOx) {
            await homeModel.updateMany(
                { 'WhyCodeOx': { $elemMatch: { _id: req.body.WhyCodeOx._id } } },
                { $set: { 'WhyCodeOx.$': req.body.WhyCodeOx } }
            );
        }

        // Update Testimonials array items
        if (req.body.Testimonials) {
            await homeModel.updateMany(
                { 'Testimonials': { $elemMatch: { _id: req.body.Testimonials._id } } },
                { $set: { 'Testimonials.$': req.body.Testimonials } }
            );
        }

        // Update KeyWebsiteCollections array items
        if (req.body.KeyWebsiteCollections) {
            await homeModel.updateMany(
                { 'KeyWebsiteCollections': { $elemMatch: { _id: req.body.KeyWebsiteCollections._id } } },
                { $set: { 'KeyWebsiteCollections.$': req.body.KeyWebsiteCollections } }
            );
        }

        // Update Client array items
        if (req.body.Client) {
            await homeModel.updateMany(
                { 'Client': { $elemMatch: { _id: req.body.Client._id } } },
                { $set: { 'Client.$': req.body.Client } }
            );
        }

        // Update about array items
        if (req.body.about) {
            await homeModel.updateMany(
                { 'about': { $elemMatch: { _id: req.body.about._id } } },
                { $set: { 'about.$': req.body.about } }
            );
        }

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

















module.exports = { addHome, getHome, updatedHome };
