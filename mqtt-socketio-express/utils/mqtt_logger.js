//  ********Libraries********
const moment = require("moment");

//  ********Flies********
const database = require("../database/index");

//  ********Log Mqtt Events and Database Working ********
function mqttLogger(mqttClient) {
  mqttClient.on("connect", () =>
    console.log("*************mqtt client connected*************")
  );

  //  ********Emiiter When Reconnect CLient********
  mqttClient.on("reconnect", () =>
    console.log("*************mqtt client reconnected...*************")
  );

  //  ********Emiiter After Receiving Disconnect Packet From Broker********
  mqttClient.on("disconnect", (packet) =>
    console.log(
      "*************disconnected packet from broker*************\n",
      packet
    )
  );

  //  ********Emiiter When Client Goes Offline********
  mqttClient.on("offline", () =>
    console.log("*************client goes offline*************")
  );

  //  ********Emitted When The Client Cannot Connect (i.e. connack rc != 0) Or When A Parsing Error Occurs********
  mqttClient.on("error", (error) =>
    console.log("**************client error**************\n", error)
  );

  //  ********Emitted When client.end() Called********
  mqttClient.on("end", () =>
    console.log("**************client closed**************")
  );

  //  ********Emitted When The Client Receives A Publish Packet********
  mqttClient.on("message", (topic, message, packet) => {
    messageToDataBase(topic, message.toString("utf-8"));
    console.log(
      "**************packet published from publisher**************\n",
      `topic: ${topic}\n`,
      `message: ${message}\n`,
      packet
    );
  });

  //  ********Emitted When The Client Sends Any Packet. This Includes .published() Packets As Well As Packets Used By MQTT For Managing Subscriptions And Connections********
  mqttClient.on("packetsend", (packet) =>
    console.log("**************packet sent**************", packet)
  );

  //  ********Emitted When The Client Sends Any Packet. This Includes .published() Packets As Well As Packets Used By MQTT For Managing Subscriptions And Connections********
  mqttClient.on("packetsend", (packet) =>
    console.log("**************packet recived**************", packet)
  );
}

function messageToDataBase(topic, message) {
  const sql = "INSERT INTO messages SET ?";
  const data = {
    topic: topic,
    payload: message,
    time: moment().format("1399/5/29 h:mm"),
  };
  database.query(sql, data, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
}
//  ********Exports********
module.exports = mqttLogger;
