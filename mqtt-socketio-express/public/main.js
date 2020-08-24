const socket = io();
const container = document.querySelector(".container");
socket.on("message", ({ topic, message }) => {
  const newMessage = document.createElement("div");
  newMessage.classList.add("message");
  newMessage.innerHTML = `<p class="meta">Topic: ${topic} <br/> Message:${message}</p>`;
  container.appendChild(newMessage);
  console.log(topic, message);
});
