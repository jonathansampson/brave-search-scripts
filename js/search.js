const { dumpSchema } = require("./utils/index.js");
const BraveAPI = require("./API.js");

const brave = new BraveAPI({
    subscription_token: process.env.BRAVE_KEY
});

const goggleID = "https://raw.githubusercontent.com/brave/"
    + "goggles-quickstart/main/goggles/tech_blogs.goggle";

const params = new URLSearchParams({
    q: "Shack15 llama3 hackathon",
    text_decorations: false,
    freshness: "pw",
    result_filter: "web",
    goggles_id: encodeURI(goggleID)
});

brave.search(params).then(results => {
    console.log(dumpSchema(results));
});

