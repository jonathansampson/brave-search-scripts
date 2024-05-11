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
    country: "us",
    search_lang: "en",
    ui_lang: "en-US",
    count: 20,
    offset: 0,
    safesearch: "strict", // off, moderate, strict
    freshness: "pw", // pd, pw, pm, py, or YYYY-MM-DDtoYYYY-MM-DD
    text_decorations: false,
    spellcheck: true,
    result_filter: "web",
    goggles_id: encodeURI(goggleID)
});

// Perform the search
brave.search(params).then(results => {
    // Log the results
    console.log(dumpSchema(results));
});

