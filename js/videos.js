const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

const params = new URLSearchParams({
    q: "function calling with groq",
    freshness: "pm",
});

brave.videos(params).then(results => {
    console.log(dumpSchema(results));
});

