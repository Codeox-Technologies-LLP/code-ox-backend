// Define a function 
function isValidColorFormat(color) {
    // Regular expression to match allowed color formats
    const allowedFormats = /^(#(?:[0-9a-fA-F]{3}){1,2}|rgb\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)|rgba\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d*\.?\d+)\s*\)|hsl\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)|hsla\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d*\.?\d+)\s*\)|hsb\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)|hsba\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d*\.?\d+)\s*\))$/;
    
    // Allow color names like "red", "green", "blue", etc.
    const colorNames = /^(red|green|blue|yellow|orange|purple|pink)$/i; // Add more color names as needed
    
    return allowedFormats.test(color) || colorNames.test(color);
}

module.exports = {
    isValidColorFormat
};
