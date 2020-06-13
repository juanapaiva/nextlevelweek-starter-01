const express = require("express");
const server = express();

// Configurando pasta public
server.use(express.static("public"));

// Rota Home
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Rota Create Point
server.get("/create-point", (req, res) => {
  res.sendFile(__dirname + "/views/create-point.html");
});

// Ligar o servidor na porta 3000
server.listen(3000);