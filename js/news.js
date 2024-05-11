// news.js
const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

// Create a new instance of the BraveAPI class
const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

// Setup the search parameters
const params = new URLSearchParams({
    q: "Shack15 llama3 hackathon",
    text_decorations: false,
    freshness: "pw",
});

// Perform the search
brave.news(params).then(results => {
    // Log the results
    console.log(dumpSchema(results));
});
