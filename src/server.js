const express = require("express");
const server = express();

// Configurando pasta public
server.use(express.static("public"));

// Utilizando Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
});

// Rota Home
server.get("/", (req, res) => {
  return res.render("index.html");
});

// Rota Create Point
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

// Rota Search Results
server.get("/search", (req, res) => {
  return res.render("search-results.html");
});

// Ligar o servidor na porta 3000
server.listen(3000);