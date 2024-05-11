// extra_snippets.js
const BraveAPI = require("./API.js");

// Create a new instance of the BraveAPI class
const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

// Setup the search parameters
const params = {
    q: "llama3 hackathon May 2024",
    text_decorations: false,
    freshness: "pm",
    result_filter: "web",
};

// Perform the search
brave.search(params).then(results => {
    // Extract the first 3 results and their snippets
    const first3 = results.web.results.slice(0, 3);
    const snippets = first3.map(result => {
        return {
            title: result.title,
            url: result.url,
            snippets: result.extra_snippets,
        }
    });

    // Log the snippets
    console.log(snippets);
});


