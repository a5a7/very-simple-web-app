const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

server.listen(port);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    socket.on("message", (arg, callback) => {
        if (arg.msg.trim() == ""){
            callback("Error: Blank Message!");
        }else{
            io.emit("addMessage", arg);
        }
    });
});

console.log("listening on port " + port);