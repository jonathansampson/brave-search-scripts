const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

const params = new URLSearchParams({
    q: "San Francisco Golden Gate Bridge",
    safesearch: "strict",
    count: 10,
});

brave.images(params).then(results => {
    console.log(dumpSchema(results));
});

