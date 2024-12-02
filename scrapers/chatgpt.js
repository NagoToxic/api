const axios = require('axios')
const fetch = require('node-fetch')

async function chatGpt(query) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer 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",
                },
                body: JSON.stringify({
                    inputs: query
                }),
            }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
chatGpt
}