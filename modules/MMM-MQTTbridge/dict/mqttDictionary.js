var mqttHook = [
    {
      mqttTopic: "greetings/face_added",
      mqttPayload: [
        {
          mqttNotiCmd: ["Face added"]
        },
      ],
    },
    {
      mqttTopic: "greetings/face_removed",
      mqttPayload: [
        {
          mqttNotiCmd: ["Face removed"]
        },
      ],
    },
    {
      mqttTopic: "temperature/internal",
      mqttPayload: [
        {
          mqttNotiCmd: ["Internal Temperature"]
        },
      ],
    },
    {
      mqttTopic: "sentence/single_sentence",
      mqttPayload: [
        {
          mqttNotiCmd: ["Single Sentence"]
        },
      ],
    },
  ];
// The payload of the MQTT message must contain an array of strings called 'names'
// that contains the name of the persons that have been recognized
var mqttNotiCommands = [
    {
      commandId: "Face added",
      notiID: "FACE_ADDED"
    },
    {
      commandId: "Face removed",
      notiID: "FACE_REMOVED"
    },
    {
      commandId: "Internal Temperature",
      notiID: "INDOOR_TEMPERATURE"
    },
    {
      commandId: "Single Sentence",
      notiID: "SINGLE_SENTENCE"
    },
  ];

  module.exports = { mqttHook,  mqttNotiCommands};
