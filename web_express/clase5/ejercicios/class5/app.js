// Se carga el módulo de Express
const express = require("express");
const { body, validationResult } = require("express-validator");
const students = require("./repositories/students");
// Creo la aplicación Express
const app = express();
// Declaro el puerto de escucha
const port = 3000;
// Defino la ruta que se llamará cuando se reciba una petición HTTP GET
// en la dirección '/'
// La función callback recibe una petición y una respuesta como argumentos
app.get("/", (req, res) => {
  // Se define la cabecera HTTP con el tipo de contenido
  res.set("Content-Type", "text/plain");
  // Se responde, en el cuerpo de la respuesta con el mensaje "Hello World!!"
  res.status(200).send("Hello World!!");
});

app.use(express.json());

app.get("/students", (req, res) => {
  students.getAll().then((results) => res.json(results));
});

// Ejercicio 3, 4 y 5
// install xpress-validator: npm install --save express-validator
// importar: const { body, validationResult } = require('express-validator');
// añadir middleware para comprobar que el campo email es un email válido
app.post("/students", 
  body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage('Invalid email format'), // validamos que sea un email. Ejercicio 3
  body("name").exists().withMessage('Name is required').notEmpty().withMessage('Name cannot be empty'), //validamos que el campo exista y no sea vacío.
  body("last_name").exists().withMessage('Last name is required').notEmpty().withMessage('Last name cannot be empty'), //validamos que el campo exista y no sea vacío.
  body("date_of_birth").exists().withMessage('Date of birth is required').notEmpty().withMessage('Date of birth cannot be empty').bail().isDate().withMessage('Invalid date format'), // validamos que sea una fecha. Ejercicio 4
  async (req, res) => {
  // obtener los resultados de la validación y los devolvemos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    // Ejercicio 5
    const user = await students.getByEmail(req.body.email);
    if (user){
      return res.status(422).json({ "message": "A user already exists with this email" });
    } else{
      students
      .insert(req.body)
      .then((result) => {
        res.json({ success: true, message: "Student was saved successfully" });
      })
      .catch((err) => {
        res.json({ success: false, message: err.detail });
      });
    }
    
  }
});

// Ejercicio 1
app.get("/students/:id", (req, res) => {
  students.getById(req.params.id).then((results) => {
    console.log(results);
    if (results) {
      res.json(results);
    } else {
      res.status(404).json({ message: "Student doesn't exist" });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ message: err.message });
  });
});

// Ejercicio 2
// sequelize migration:create --name add_email
// modificar migrations/[TIMESTAMP]_add_email.js
// ejecutar: sequelize db:migrate
// rollback de la última migración: sequelize db:migrate:undo
// rollback de todas las migraciones: sequelize db:migrate:undo:all
// introducir un registro con:
// curl -v -POST http://localhost:3000/students -H "content-type: application/json" -d '{"name": "Fausto", "last_name": "López", "date_of_birth": "1987-04-25", "email": "flopez@veridas.com"}'
// curl -v -POST http://localhost:3000/students -H "content-type: application/json" -d '{"name": "", "last_name": "López", "date_of_birth": "1987-04-25", "email": "flopez@veridas.com"}'
// No vemos los campos, luego, tenemos que actualizar el modelo.


// Creo el servidor en el puerto ${port}
app.listen(port, () => {
  // Se escribe la URL para el acceso al servidor
  console.log(`Example server listening on http://localhost:${port}`);
});
