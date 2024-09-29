Module.register("MMM-SingleSentence", {
    defaults: {
        displayTime: 15 * 60 * 1000, // Time in ms to display the sentence before clearing
        animationSpeed: 1000 // Animation speed for updating the DOM
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.sentencesDetected = [];
    },

    notificationReceived(notification, payload, sender) {
        if (notification === "SINGLE_SENTENCE") {
            this.sentenceDetected(payload);
        }
    },

    sentenceDetected(payload) {
        if (payload.hasOwnProperty('sentence')) {
            Log.info("Sentence detected: " + payload.sentence); // Log the detected sentence
            this.sentencesDetected.push(payload.sentence);
            this.updateDom(this.config.animationSpeed);
        }

        setTimeout(() => {
            this.sentenceRemoved(payload);
        }, this.config.displayTime);
    },

    sentenceRemoved(payload) {
        if (payload.hasOwnProperty('sentence')) {
            const index = this.sentencesDetected.indexOf(payload.sentence);
            if (index !== -1) {
                this.sentencesDetected.splice(index, 1);
                this.updateDom(this.config.animationSpeed);
            }
        }
    },

    getDom() {
        const wrapper = document.createElement("div");

        if (this.sentencesDetected.length > 0) {
            wrapper.className = this.config.classes ? this.config.classes : "thin small bright pre-line";

            let sentencesText = "";
            for (const [index, sentence] of this.sentencesDetected.entries()) {
                sentencesText = sentencesText.concat(sentence);
                if (index < this.sentencesDetected.length - 1) {
                    sentencesText = sentencesText.concat(" ");
                }
            }

            Log.info("Displaying sentence: " + sentencesText); // Log the text to display

            const sentenceElement = document.createElement("span");
            sentenceElement.appendChild(document.createTextNode(sentencesText));
            wrapper.appendChild(sentenceElement);
        }

        return wrapper;
    }
});
