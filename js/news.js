const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

const params = new URLSearchParams({
    q: "Shack15 llama3 hackathon",
    text_decorations: false,
    freshness: "pw",
});

brave.news(params).then(results => {
    console.log(dumpSchema(results));
});
