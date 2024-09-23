Module.register("MMM-RandomQuotes", {
  defaults: {
      updateInterval: 18 * 60 * 1000,  // 18 minutes
      apis: [
          { url: "https://api.api-ninjas.com/v1/quotes", type: "quote" },
          { url: "https://api.api-ninjas.com/v1/facts", type: "fact" },
          { url: "https://api.api-ninjas.com/v1/trivia", type: "trivia" }
      ],
      apiKey: "LPBDCymlX3maYlUMhd7GDA==EiLvpCDgS6M3aQTJ",  // Replace with your Ninja API key
      activeHours: { start: 8, end: 20 },
      maxCallsPerDay: 40
  },

  start: function() {
      this.currentApiIndex = 0;  // Start with the first API
      this.data = "";
      this.dailyCalls = 0;
      this.lastCallDate = null;
      this.getData();
      setInterval(() => {
          this.getData();
      }, this.config.updateInterval);
  },

  getData: function() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour >= this.config.activeHours.start && currentHour < this.config.activeHours.end) {
          if (this.dailyCalls < this.config.maxCallsPerDay || !this.isSameDay(this.lastCallDate, currentTime)) {
              this.fetchData();
          }
      }
  },

  fetchData: function() {
      this.sendSocketNotification("GET_RANDOM_QUOTE", {
          apiKey: this.config.apiKey,
          url: this.config.apis[this.currentApiIndex].url,
          type: this.config.apis[this.currentApiIndex].type
      });
  },

  socketNotificationReceived: function(notification, payload) {
      if (notification === "GET_RANDOM_QUOTE_RESPONSE") {
          this.data = payload.quote;
          this.updateDom();
          this.rotateApi();  // Move to the next API for the next cycle
      }
  },

  rotateApi: function() {
      // Move to the next API for the next 18-minute cycle
      this.currentApiIndex = (this.currentApiIndex + 1) % this.config.apis.length;
  },

  isSameDay: function(date1, date2) {
      if (!date1) return false;
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear();
  },

  getDom: function() {
      const wrapper = document.createElement("div");
      wrapper.className = "data-wrapper";
      wrapper.innerHTML = this.data || "Loading data...";
      return wrapper;
  }
});
