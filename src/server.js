const express = require("express");
const server = express();

// Pegando o banco de dados
const db = require("./database/db");

// Configurando pasta public
server.use(express.static("public"));

// Habilitando o udo do req.body
server.use(express.urlencoded({ extended: true }));

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

server.post("/savepoint", (req, res) => {
  // Inserir dados
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro');
    }

    console.log('Cadastrado com sucesso!');
    console.log(this);

    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData);
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