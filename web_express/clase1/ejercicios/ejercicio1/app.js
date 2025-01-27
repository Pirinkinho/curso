// Se carga el módulo de Express
const express = require("express");

// Se carga el módulo de mustache-express
// En tu código, el archivo user.html es usado porque estás utilizando Mustache como motor de plantillas, y la función res.render("user", {...}) le indica a Express que busque un archivo llamado user.html en la carpeta /views.
const mustacheExpress = require("mustache-express");

// Creo la aplicación Express
const app = express();

// Declaro el puerto de escucha
const port = 3000;

// Aquí le dices a Express que el motor de plantillas para los archivos con extensión .html será mustacheExpress(). Esto significa que cuando se invoque res.render() con una extensión .html, Express usará Mustache para procesar el archivo.
app.engine("html", mustacheExpress());

// Esto le dice a Express que el motor de plantillas para los archivos con extensión .html será Mustache, como configuraste en el paso anterior.
app.set("view engine", "html");

// Le indica a Express dónde buscar las vistas (archivos HTML). En este caso, se le indica que busque en la carpeta /views que está en el mismo directorio que el archivo app.js (indicado por __dirname).
app.set("views", __dirname + "/views");

// Hacer pública la carpeta 'public' para servir archivos estáticos
app.use(express.static(__dirname + "/public"));

// Defino la ruta que se llamará cuando se reciba una petición HTTP GET
// en la dirección '/'
// La función callback recibe una petición y una respuesta como argumentos
app.get("/", (req, res) => {

  // Se define la cabecera HTTP con el tipo de contenido
  res.set("Content-Type", "text/plain");

  // Se responde, en el cuerpo de la respuesta con el mensaje "Hello World!!"
  res.status(200).send("Hello World!!");
});


app.get("/user", (req, res) => {
  // Se define la cabecera HTTP con el tipo de contenido
  res.set("Content-Type", "text/plain");
  // Se responde, en el cuerpo de la respuesta con el mensaje "Hello World!!"
  res.status(200).send("Hello User!!");
});

app.get("/user/:name", (req, res) => {
  const username = req.params.name; // Captura el name desde la URL
  res.render("user", { title: "User", name: username }); // Renderiza la vista con los datos
});

// creo Endpoint /student/:id
app.get("/student/:id", (req, res) => {
  const studentId = req.params.id; // Captura el ID desde la URL
  res.render("student", { title: "Student", id: studentId }); // Renderiza la vista con los datos
});


// Creo el servidor en el puerto ${port}
app.listen(port, () => {

  // Se escribe la URL para el acceso al servidor
  console.log(`Example server listening on http://localhost:${port}`);
});

