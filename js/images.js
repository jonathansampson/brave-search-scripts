// images.js
const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

// Create a new instance of the BraveAPI class
const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

// Setup the search parameters
const params = {
    q: "San Francisco Golden Gate Bridge",
    safesearch: "strict",
    count: 10,
};

// Perform the search
brave.images(params).then(results => {
    // Log the results
    console.log(dumpSchema(results));
});

