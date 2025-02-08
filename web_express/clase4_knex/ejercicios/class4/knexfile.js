
// Update with your config settings. knexfile.js

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  development: {
    client: "pg",
    connection: {
      host: '127.0.0.1',   // Asumiendo que estás conectando desde tu host
      port: 5433,         // Puerto correcto para el contenedor dev-express-db-1
      database: "express-db",
      user:     "postgres",
      password: "changeme"
    },
    
    pool: {
      min: 0,
      max: 5
    },
  },
};
