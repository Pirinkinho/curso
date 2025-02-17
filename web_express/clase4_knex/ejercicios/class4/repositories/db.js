
// repositories/db.js

const environment = process.env.NODE_ENV || "development";

import knexConfig from '../knexfile.js';
const configuration = knexConfig[environment];

import knex from 'knex';
const db = knex(configuration);

export default db;
