// Se carga el módulo de Express
const express = require("express");
// Creo la aplicación Express
const app = express();
// Declaro el puerto de escucha
const port = 3000;

// Ejercicio 1
// Instalo el middleware mustache-express: npm install mustache-express --save
// Cargo el módulo
const mustacheExpress = require("mustache-express");

// Configuro la ubicación de las vistas
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

// Creo endpoint GET /login
app.get("/login", (req, res) => {
  // Renderizo el archivo views/login.html
  res.render("login");
});

// Ejercicio 2
// Instalo el módulo express-session: npm install express-session --save
// Cargo el módulo express-session
const session = require("express-session");
// Cargamos la función middleware de session
app.use(
  session({
    secret: "ClaveUltraSecreta",
    resave: false,
    saveUninitialized: false,
  })
);

// Habilito los middlewares para convertir el cuerpo de urlencoded
app.use(express.urlencoded({ extended: false }));

// Creo endpoint POST /login
app.post("/login", (req, res) => {
  if (req.body.username == "foo" && req.body.password == "bar") {
    req.session.isLogged = true;
  }
  res.redirect("/home");
});

// Ejercicio 3
// Compruebo si ha iniciado sesión a través de la variable isLogged de la sesión.
app.get("/home", (req, res) => {
  if (req.session.isLogged) {
    res.render("home");
  } else {
    res.render("login");
  }
});

// Ejercicio 4
// Elimino la variable de la sesión y hago redirect a /login
// ¿Qué ocurre si hago redirect a /home?
app.post("/logout", (req, res) => {
  delete req.session.isLogged;
  res.redirect("/login");
});

// Ejercicio 5
// Para este ejercicio voy a cargar otro middleware
// El middleware express.json para poder convertir cuerpos de json
app.use(express.json());

// Instalo el módulo jsonwebtoken: npm install jsonwebtoken --save
// Cargo el módulo jsonwebtoken
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ClaveMegaSecreta";

// Creo endpoint POST /api/token
// Lo puedo probar ejecutando en la consola:
// curl -POST http://localhost:3000/api/token -H "content-type: application/json" -d '{"username": "foo", "password": "bar"}'
app.post("/api/token", (req, res) => {
  if (req.body.username == "foo" && req.body.password == "bar") {
    const token = jwt.sign(
      { data: { username: req.body.username } },
      JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );
    res.json({ token: token });
  } else {
    res.sendStatus(401);
  }
});

// Ejercicio 6

// Middleware para obtener el data de JWT
const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Authorization Header missing",
    });
  }
  let authorization = req.headers.authorization;
  let token = authorization.split(" ")[1];
  let jwtData;
  try {
    jwtData = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid Token.",
    });
  }
  req.data = jwtData.data;
  next();
};

// Defino el endpoint de api protegido GET /api/protected
// Lo puedo probar ejecutando en la terminal:
// curl -GET http://localhost:3000/api/protected -H "Authorization: Bearer ${TOKEN}"
app.get("/api/protected", isAuth, (req, res) => {
  res.json(req.data);
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

// Creo el servidor en el puerto ${port}
app.listen(port, () => {
  // Se escribe la URL para el acceso al servidor
  console.log(`Example server listening on http://localhost:${port}`);
});
