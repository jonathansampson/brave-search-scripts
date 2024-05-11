// search.js
const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

// Create a new instance of the BraveAPI class
const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

// Goggles ID for tech blogs
const goggleID = "https://raw.githubusercontent.com/brave/"
    + "goggles-quickstart/main/goggles/tech_blogs.goggle";

// Setup the search parameters
const params = new URLSearchParams({
    q: "Shack15 llama3 hackathon",
    text_decorations: false,
    freshness: "pw",
    result_filter: "web",
    goggles_id: encodeURI(goggleID)
});

// Perform the search
brave.search(params).then(results => {
    // Log the results
    console.log(dumpSchema(results));
});

