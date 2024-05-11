const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

const params = new URLSearchParams({
    q: "Third tallest mountain in the World",
});

brave.summarizer(params).then(results => {
    console.log(dumpSchema(results));
});
