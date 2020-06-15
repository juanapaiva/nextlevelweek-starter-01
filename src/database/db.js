// Importando a dependência do Sqlite3
const sqlite3 = require("sqlite3").verbose();

// Criando o objeto que fará as operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Serialize: roda uma sequência de códigos
// db.serialize(() => {
//   // Criar uma tabela
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `);

//   // Inserir dados
//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (?,?,?,?,?,?,?);
//   `

//   const values = [
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "N° 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis e Papelão"
//   ]

//   function afterInsertData(err) {
//     if (err)
//       return console.log(err);

//     console.log('Cadastrado com sucesso');
//     console.log(this);
//   }

//   db.run(query, values, afterInsertData);

//   // Consultar dados
//   db.all(`SELECT * FROM places`, function(err, rows) {
//     if (err)
//       return console.log(err);

//     console.log('Aqui estão os seus registros');
//     console.log(rows);
//   });

//   // Deletar dados
//   db.run(`DELETE FROM places WHERE id = ?`, [6], function(err) {
//     if (err)
//       return console.log(err);

//     console.log('Registro deletado com sucesso!');
//   });
// });