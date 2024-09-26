var self;
Module.register("MMM-SingleSentence", {
	// Module config defaults.
	defaults: {
		updateInterval: 15*60, // 15 minutes
		showSymbol: false,
		fadeSpeed: 4000,
		category: "",
		apiKey: "LPBDCymlX3maYlUMhd7GDA==EiLvpCDgS6M3aQTJ", // create on API Ninjas
		sentenceSize: "M", 	// S M L - Default M
		maxSentenceLenght: 180	// Max number of sentence's characters
	},

	getStyles () {
		return ["MMM-SingleSentence.css", "font-awesome.css"];
	},

	// Override start method.
	start () {
		self = this;
		Log.info(`Starting module: ${this.name}`);

		this.lastSentenceIndex = -1;
		this.lastIndexUsed = -1;
		this.sentences = [];

		this.downloadSentenceFromService();
		Log.info(`Module ${this.name}: notification send.`);

		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval * 1000);
	},

	socketNotificationReceived (notification, payload) {
		if (notification === "GET_RANDOM_JOKE_RESPONSE") {
			if (payload.length == 0) {
				console.error(`Module ${this.name}: 0 sentences received.`);
				return;
			}

			var sentenceDetail = { sentence: payload[0].sentence.replace("\n", "")};
			if(sentenceDetail.sentence.length <= this.config.maxSentenceLenght) {
				this.sentences.push(sentenceDetail);
				this.updateDom();
			}
			else{
				Log.info(`Module ${this.name}: sentence length is ${sentenceDetail.sentence.length} and exceed max lenght. Look for another.`);
				this.downloadSentenceFromService();
			}
		}
	},

	getRandomSentence () {
		this.lastIndexUsed++;
		if (this.lastIndexUsed == this.sentences.length) {
			this.downloadSentenceFromService ();
			this.lastIndexUsed = this.sentences.length - 1;
			if (this.sentences.length == 9000) this.lastIndexUsed = 0;
		}
		return this.sentences[this.lastIndexUsed] || "";
	},

	downloadSentenceFromService () {
		var data = this.config;
		this.sendSocketNotification("GET_RANDOM_JOKE", data);
	},

	getDom () {
		var container = document.createElement("div");
		const wrapper = document.createElement("div");

		var sentenceLineDiv = document.createElement("div");
		var sentenceFontSize = this.getFontSize(this.config.sentenceSize);
		sentenceLineDiv.className = `thin bright pre-line ${sentenceFontSize}`;

		if (this.config.showSymbol) {
			var symbol = document.createElement("span");
			symbol.className = "fa fa-quote-left symbol-quote symbol-quote-left";
			sentenceLineDiv.appendChild(symbol);
		}

		var sentenceText = this.getRandomSentence();
		var sentenceLineSpan = document.createElement("span");
		sentenceLineSpan.innerHTML = sentenceText.sentence;
		sentenceLineDiv.appendChild(sentenceLineSpan);

		if (this.config.showSymbol) {
			symbol = document.createElement("span");
			symbol.className = "fa fa-quote-right symbol-quote symbol-quote-right";
			sentenceLineDiv.appendChild(symbol);
		}
		container.appendChild(sentenceLineDiv);

		wrapper.innerHTML += container.innerHTML;
		return wrapper;
	},

	getFontSize (size) {
		if (size == "S") return "small";
		
		if (size == "L") return "large";
		else return "medium";
	}
});