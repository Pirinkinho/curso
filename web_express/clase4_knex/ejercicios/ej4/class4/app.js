const express = require("express");
const { body, validationResult } = require("express-validator");
const students = require("./repositories/students");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/students", (req, res) => {
  students.getAll().then((results) => res.json(results));
});
// Ejercicio 3
// install xpress-validator: npm install --save express-validator
// importar: const { body, validationResult } = require('express-validator');
// añadir middleware para comprobar que el campo email es un email válido
app.post("/students", 
  body("email").isEmail(), // validamos que sea un email
  body("name").exists().notEmpty(), //validamos que campo exista y no sea vacío
  body("date_of_birth").isDate(), // validamos que sea una fecha
  (req, res) => {
  // obtener los resultados de la validación y los devolvemos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!(req.body.name && req.body.last_name && req.body.date_of_birth)) {
    res
      .status(422)
      .send("All fields are required (name, last_name, date_of_birth)");
  } else {
    students
      .insert(req.body)
      .then((result) => {
        res.json({ success: true, message: "Student was saved successfully" });
      })
      .catch((err) => {
        res.json({ success: false, message: err.detail });
      });
  }
});

// Ejercicio 1
app.get("/students/:id", (req, res) => {
  students
    .getById(req.params.id)
    .then((results) => {
      console.log(results);
      if (results) {
        res.json(results);
      } else {
        res.status(404).json({ message: "Student doesn't exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// Ejercicio 2
// knex migrate:make add_email
// modify migrations/[TIMESTAMP]_add_email.js
// ejecutar: knex migrate:all
// introducir un registro con:
// curl -v -POST http://localhost:3000/students -H "content-type: application/json" -d '{"name": "Fausto", "last_name": "López", "date_of_birth": "1987-04-25", "email": "flopez@veridas.com"}'
// curl -v -POST http://localhost:3000/students -H "content-type: application/json" -d '{"name": "", "last_name": "López", "date_of_birth": "1987-04-25", "email": "flopez@veridas.com"}'

app.listen(port, () => {
  console.log(`Example server listening on http://localhost:${port}`);
});
