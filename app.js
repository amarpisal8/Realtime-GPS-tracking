// Package imports
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import chalk from 'chalk';
import { log } from 'console';

// Initialize express app
const app = express();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create server
const server = http.createServer(app);
const io = new Server(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.render("index");
});

io.on("connection", function(socket) {
    console.log(chalk.green("A user connected: " + socket.id));

    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
        console.log(chalk.red("A user disconnected: " + socket.id));
    });
});

server.listen(3000, function() {
    console.clear();
    console.log(chalk.bgBlueBright.black('Server is running on port 3000'));
    console.log();
    console.log(chalk.bgBlackBright.whiteBright("No You Can View"));
});

