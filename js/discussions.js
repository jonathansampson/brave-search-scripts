// discussions.js
const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

// Create a new instance of the BraveAPI class
const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

// Setup the search parameters
const params = new URLSearchParams({
    q: "javascript vs python",
    result_filter: "discussions"
});

// Perform the search
brave.search(params).then(results => {
    // Log the results
    console.log(dumpSchema(results.discussions));
});

