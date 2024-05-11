async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = class BraveAPI {

    headers = new Headers({
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
    });

    version = "v1";
    poll_sleep_time = 50;
    base = "https://api.search.brave.com/res";

    constructor(options) {
        if (!options.subscription_token) {
            throw new Error("Missing subscription token");
        }
        this.headers.set("X-Subscription-Token", options.subscription_token);
    }

    async search(params) {
        const path = "/web/search";
        const query = new URLSearchParams(params);
        const endpoint = `${this.base}/${this.version}${path}?${query}`;
        return fetch(endpoint, { headers: this.headers }).then(res => res.json());
    }

    async summarizer(params) {

        params.set("summary", true);

        const search = await this.search(params);

        if (!search.summarizer) {
            throw new Error("No summarizer key found");
        }

        const path = "/summarizer/search";
        const query = new URLSearchParams({
            key: search.summarizer.key,
            entity_info: 1
        });

        const endpoint = `${this.base}/${this.version}${path}?${query}`;

        let results = await fetch(endpoint, {
            headers: this.headers
        }).then(res => res.ok && res.json());

        while (!results) {
            await sleep(this.poll_sleep_time);
            results = await fetch(endpoint, {
                headers: this.headers
            }).then(res => res.ok && res.json());
        }

        return results;
    }

    async news(params) {
        const path = "/news/search";
        const query = new URLSearchParams(params);
        const endpoint = `${this.base}/${this.version}${path}?${query}`;
        return fetch(endpoint, { headers: this.headers }).then(res => res.json());
    }

    async images(params) {
        const path = "/images/search";
        const query = new URLSearchParams(params);
        const endpoint = `${this.base}/${this.version}${path}?${query}`;
        return fetch(endpoint, { headers: this.headers }).then(res => res.json());
    }

    async videos(params) {
        const path = "/videos/search";
        const query = new URLSearchParams(params);
        const endpoint = `${this.base}/${this.version}${path}?${query}`;
        return fetch(endpoint, { headers: this.headers }).then(res => res.json());
    }

}