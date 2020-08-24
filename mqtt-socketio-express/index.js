//  ********Libraries********
const express = require("express");
const mqtt = require("mqtt");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

//  ********Flies********
const topics = require("./mqtt/topics");
const mqttLogger = require("./utils/mqtt_logger");

//  ********Initial Mqtt********
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org');
mqttLogger(mqttClient);

//  ********Initial Server********
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//  Set Static Folder
const Public = path.join(__dirname, "public");
app.use(express.static(Public));
//  Messages API
app.use("/api/messages", require("./routes/api/messages"));
server.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

//  ********Run When Client Connects********
io.on("connection", (socket) => {
  //  Listen Messages From Mqtt Broker
  mqttClient.on("message", (topic, message) => {
    socket.emit("message", {
      topic: topic,
      message: message.toString("utf-8"),
    });
  });
});

//  Subscribers
mqttClient.subscribe(topics.temp);
mqttClient.subscribe(topics.fan);
mqttClient.subscribe(topics.door);
mqttClient.subscribe(topics.lamp);

//  Publishers
mqttClient.publish(topics.temp, "20");
mqttClient.publish(topics.door, "close");
mqttClient.publish(topics.fan, "on");
mqttClient.publish(topics.lamp, "off");
