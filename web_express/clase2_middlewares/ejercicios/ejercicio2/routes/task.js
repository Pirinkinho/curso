// routes/task.js
const express = require("express");
let router = express.Router();
// La función se ejecuta cada vez que la aplicación recibe una solicitud.
router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
// La función se ejecuta para cualquier tipo de solicitud HTTP en ruta /:id.
router.use("/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});
// La función maneja las solicitudes GET a la ruta /:id.
router.get("/:id", (req, res, next) => {
  res.send("ID: " + req.params.id);
});

module.exports = router;
