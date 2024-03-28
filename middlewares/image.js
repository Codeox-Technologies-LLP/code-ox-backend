
/// add Image
function addImage(req ,next) {
    try {
        const { path: imagePath } = req.file;
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        return baseUrl;
    } catch (error) {
        console.error("Error adding image:", error);
        return null;
    }
}
//  update an image
function updateImage(req) {
    try {
        if (!req.file) {
            return null; // Return null if req.file is not provided
        }

        const { path: imagePath } = req.file;
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        return baseUrl;
    } catch (error) {
        console.error("Error updating image:", error);
        return null;
    }
}



module.exports = {
    addImage,
    updateImage,

};