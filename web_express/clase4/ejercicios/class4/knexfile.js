// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "express-db-knex",
      user: "postgres",
      password: "1234",
    },
    pool: {
      min: 0,
      max: 5,
    },
  },
 };
 
