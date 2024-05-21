const fs = require('fs');
const path = require('path');
/// add Image
const addImage = (req, next) => {
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
const updateImage = (req) => {
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

const deleteImage = (response, req) => {
    if (!response?.image) return;
    const fileName = path.basename(response.image);
    const filePath = path.join(__dirname, 'public/images', fileName);
    const modifiedFilePath = filePath.replace(/\\middlewares/g, '');
    try {
        fs.unlinkSync(modifiedFilePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error('Error deleting file:', err);
    }
}




module.exports = { addImage, updateImage, deleteImage };