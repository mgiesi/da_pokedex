function init() {
    loadAlbum();
    initSearchEngine();
}

/**
 * Helper function to add leeding zeros to any number
 * Sample:
 * formatId(123, "0000") => 0123
 * 
 * @param {number} value numeric value
 * @param {string} format leading zero format like "0000" 
 * 
 * @return {string} formatted value like "0000"
 */
function formatValue(value, format) {
    return (format + value).slice(-format.length);
}

/**
 * Helper function to capitalize the first letter of an string.
 * 
 * @param {string} value text value
 * @returns text value with capitalized first letter
 */
function capitalizeFirstLetter(value) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}