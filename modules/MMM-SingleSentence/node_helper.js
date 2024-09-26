const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start () {
		console.log(`Starting node_helper for module: ${this.name}`);
	},

	async getRandomSentence (config) {
		var url = `https://api.api-ninjas.com/v1/jokes`;
		try {
			const response = await fetch(url, {
				headers: { "X-Api-Key": config.apiKey }
			});
			const data = await response.json();
			if (data.length == 0) console.error(`Module ${this.name}: 0 jokes received.`);
			return data;
		} catch (error) {
			console.error("Error fetching jokes: ", error);
			return null;
		}
	},

	async socketNotificationReceived (notification, payload) {
		if (notification === "GET_RANDOM_JOKE") {
			const sentence = await this.getRandomSentence(payload);
			this.sendSocketNotification("GET_RANDOM_JOKE_RESPONSE", sentence);
		}
	}
});