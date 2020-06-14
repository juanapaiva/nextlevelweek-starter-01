const express = require("express");
const server = express();

// Pegando o banco de dados
const db = require("./database/db");

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
  // Pegar dados
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err)
      return console.log(err);

    const total = rows.length;
    
    // Renderizar página
    return res.render("search-results.html", { places: rows, total });
  });
});

// Ligar o servidor na porta 3000
server.listen(3000);