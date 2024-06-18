const fs = require('fs');
const path = require('path');


// Add Image function
const addImage = (req, next) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const { path: imagePath } = req.file;
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        return baseUrl;
    } catch (error) {
        console.error("Error adding image:", error);
        throw new Error("Error adding image: " + error.message); // Rethrow the error with a more descriptive message
    }
}

// Update Image function
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

// Delete Image function
const deleteImage = (response) => {
    try {
        if (!response || !response.image) {
            console.error('No image to delete');
            return;
        }
        
        const filePath = path.join(__dirname, '..', 'public/images', response.image);
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error('Error deleting file:', err);
    }
}

module.exports = { addImage, updateImage, deleteImage };
