const socket = io("http://localhost:3000");

const messageContainer = document.getElementById("message-container");

const messageForm = document.getElementById("send-container");

const messageInput = document.getElementById("message-input");

const roomContainer = document.getElementById("room-container");

console.log(roomName);

if(messageForm != null){

  const name=prompt("Enter your name : ");

  appendMessage("You joined");

  socket.emit("new-user",roomName , name);

  messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`);
    socket.emit("send-chat-message",roomName , message);
    messageInput.value="";
  });
  
}
  

socket.on("user-connected",name=>{
  appendMessage(`${name} Connected`);
});

socket.on("user-disconnected",name=>{
  appendMessage(`${name} Disconnected`);
})

socket.on("chat-message",(data)=>{
  appendMessage(`${data.name} : ${data.message}`);
});

socket.on("room-created",(room)=>{
  console.log("room created");
  const roomElement = document.createElement("div");
  roomElement.innerText=room
  const roomLink = document.createElement("a")
  roomLink.href = `/${room}`;
  roomLink.innerText="Join";
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
})

function appendMessage(message){
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}