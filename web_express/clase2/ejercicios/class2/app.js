// Se carga el módulo de Express
const express = require("express");
// Creo la aplicación Express
const app = express();
// Declaro el puerto de escucha
const port = 3000;

// Middlewares de aplicación
// La función se ejecuta cada vez que la aplicación recibe una solicitud.
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// La función se ejecuta para cualquier tipo de solicitud HTTP en ruta /user/:id.
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

// Subpila de middleware que imprime información de solicitud para cualquier tipo de solicitud HTTP en la ruta /user/:id.
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type composed:", req.method);
    next();
  }
);

// La función maneja las solicitudes GET a la ruta /user/:id.
app.get("/user/:id", (req, res, next) => {
  res.send("USER ID: " + req.params.id);
});

// Desde la consola ejecutar:
// curl -XPOST http://localhost:3000/user/12345
app.post("/user/:id", (req, res, next) => {
  res.send("POST USER: " + req.params.id);
});

// Este ejemplo muestra una subpila de middleware que maneja
// solicitudes GET a la ruta /user/:id.
app.get(
  "/book/:id",
  (req, res, next) => {
    console.log("BOOK ID:", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("Book info");
  }
);
// Manejador para la ruta /book/:id que imprime el book ID
// Este middleware nunca se ejecutará
app.get("/book/:id", (req, res, next) => {
  res.end(req.params.id);
});

// Subpila de middleware que maneja solicitudes GET a la ruta /student/:id.
app.get(
  "/student/:id",
  (req, res, next) => {
    if (isNaN(Number(req.params.id))) throw new Error('Student ID inválido, introduzca un número');
    // Ejercicio 2
    if (req.params.id > 99) next(Error('Student ID no puede ser mayor de 99'));
    // Si el student ID es 0, salta a la siguiente ruta 'special'
    if (req.params.id == 0) next("route");
    // en otro caso pasa el control al siguiente middleware 'regular'
    else next(); //
  },
  (req, res, next) => {
    // ‘renderiza’ una página regular
    res.send("regular");
  }
);
// manejador para la ruta /student/:id que ‘renderiza’ una página especial
app.get("/student/:id", (req, res, next) => {
  res.send("special");
});

// Middlewares incorporados
// ****** STATIC ******
// Creamos la carpeta public, en la terminal ejecuta: mkdir public
app.use("/static", express.static(__dirname + "/public"));
// Acceder a:
// http://localhost:3000/static/css/style.css
// http://localhost:3000/static/images/veridas.png
// http://localhost:3000/static/js/alert.js
// http://localhost:3000/static/hello.html

// ****** JSON, TEXT, URLENCODED ******
// Declaro los middlewares que quiero usar
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
// Defino la ruta que se llamará cuando se reciba una petición HTTP POST
// en la dirección '/user'
app.post("/user", (req, res) => {
  // Imprime por consola el tipo del body y el body parseado
  console.log(typeof req.body, req.body);
  // Ejercicio 1
  res.end(req.body.title);
});

// ****** ROUTER ******
// Cargo el módulo router task
const task_router = require("./routes/task");
// Cargo el router de task en mi aplicación
app.use("/task", task_router);

// ****** TERCEROS ******
// Se carga el módulo de cookie-parser
const cookieParser = require("cookie-parser");
// Se carga la función de cookie-parsing
app.use(cookieParser());

// Ruta para asignar una cookie
app.get("/cookie", (req, res) => {
  res.cookie("custom-cookie", "cookie value").send("Cookie is set");
});
// Obtengo los valores de las cookies
app.get("/check-cookie", (req, res) => {
  // Cookies que no han sido firmadas
  console.log("Cookies: ", req.cookies);
  res.end(req.cookies["custom-cookie"]);
});

// Defino la ruta que se llamará cuando se reciba una petición HTTP GET
// en la dirección '/'
// La función callback recibe una petición y una respuesta como argumentos
app.get("/", (req, res) => {
  // Se define la cabecera HTTP con el tipo de contenido
  res.set("Content-Type", "text/plain");
  // Se responde, en el cuerpo de la respuesta con el mensaje "Hello World!!"
  res.status(200).send("Hello World!!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo ha fallado!: " + err.message);
});

// Creo el servidor en el puerto ${port}
app.listen(port, () => {
  // Se escribe la URL para el acceso al servidor
  console.log(`Example server listening on http://localhost:${port}`);
});
