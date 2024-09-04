const searchString = "apple, orange banana,grape,watermelon";

// Split the string by space or comma
const splitArray = searchString.split(/[s,]+/);

// Display the resulting array
console.log(splitArray);
