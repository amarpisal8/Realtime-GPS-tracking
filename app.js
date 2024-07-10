// package declaration
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

// make server
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.render("index");
});

io.on("connection", function(socket) {
    socket.on("send-location" , function(data){
        io.emit("receive-location" , {id : socket.id , ...data})
    });
    socket.on("disconnect" , ()=>{
        io.emit("user-disconnected" , socket.id)
    })

    console.log("Connected");
});

server.listen(3000, function() {
    console.log('Server is running on port 3000');
});

