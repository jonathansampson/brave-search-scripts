const BraveAPI = require("./API.js");

const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

const params = new URLSearchParams({
    q: "llama3 hackathon May 2024",
    text_decorations: false,
    freshness: "pm",
    result_filter: "web",
});

brave.search(params).then(results => {
    const first3 = results.web.results.slice(0, 3);
    const snippets = first3.map(result => {
        return {
            title: result.title,
            url: result.url,
            snippets: result.extra_snippets,
        }
    });

    console.log(snippets);
});


