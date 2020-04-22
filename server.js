const express = require("express");
const socketIo = require("socket.io");
const app = express();
// express.js wird mit http von NodeJS verbunden
const http = require("http").createServer(app);
// const process = require('process'); // Nicht nötig Über NodeJS direkt zugriff drauf
// https://nodejs.org/api/process.html
// socketIo greift auf dass HTTP-Modul von NodeJS zurück
const io = socketIo(http);
// const tododb = require('./db/tododb');
// const tododb = require('./db/tododb_object');

const TodoList = require("./db/tododb_class");
const tododb = new TodoList();

tododb.add("buy coffee");
tododb.add("drink coffee");
tododb.add("go for a walk");

tododb.set(1, true);

// const PORT = 8081;
// const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`new connection: ${socket.id}`);

  socket.on("get", () => {
    // io.emit('push', tododb.get());
    console.log("get()");

    io.emit("fetch", tododb.get());
  });

  socket.on("add todo", (text) => {
    console.log(`add todo: ${text}`);
    tododb.add(text);
    io.emit("fetch", tododb.get());
  });

  socket.on("clean todos", () => {
    tododb.clean();
    io.emit("fetch", tododb.get());
  });

  socket.on("set todo", (index, isDone) => {
    console.log(`set(${index}, ${isDone})`);
    tododb.set(index, isDone);
    io.emit("fetch", tododb.get());
  });
});

// app.get('/', (req, res) => {
//   res.send('Hello');
// });

// Server wird über http-Modul von NodeJs.
http.listen(PORT, () => {
  console.log(
    // `Server running at http://${HOST}:${PORT} ,\n Shut down with CTRL + C.`
    `Server running...`
  );
});
