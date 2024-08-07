/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR", "DEBUG"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
		    module: "helloworld",
		    position: "top_left",
		    config: {
				// text: "Say Yes to AYES!",
				imagePath: "modules/default/helloworld/AYES_Icon.png",
				imageWidth: "60%",
				imageHeight: "60%",
		        
		    }
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				timezone: "Europe/Brussels",
			}
		},
		// {
		//     module: "calendar",
		//     header: "Belgian Holidays",
		//     position: "top_left",
		//     config: {
		//         calendars: [
		//             {
		//                 fetchInterval: 7 * 24 * 60 * 60 * 1000,
		//                 symbol: "calendar-check",
		//                 url: "https://www.officeholidays.com/ics/belgium"
		//             }
		//         ]
		//     }
		// },
		
		// {
		// 	module: "compliments",
		// 	position: "lower_third"
		// },
		{
			module: "greetings",
			position: "lower_third"
        },
		{
			module: 'MMM-MQTTbridge',
			disabled: false,
			config: {
				mqttServer: "mqtt://localhost:1883",
				mqttConfig:
				{
					listenMqtt: true,
					interval: 300000,
				},
			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Brussels",
				// locationID: "2800866",
				apiKey: "f8b3c5d1e4b3a80422d92bdf820148e9",
				timezone: "Europe/Brussels"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Brussels",
				// locationID: "2800866",
				apiKey: "f8b3c5d1e4b3a80422d92bdf820148e9",
				colored: true
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "BBC News",
						url: "https://feeds.bbci.co.uk/news/world/rss.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
