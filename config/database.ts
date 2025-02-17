import * as mysql from 'mysql2/promise';
require('dotenv').config();

let pool: mysql.Pool

export async function cachedsqlclient() {

    if (!pool) {
        const config = {
          connectionLimit: 10,
          user: "sql12762125",
          host: "sql12.freesqldatabase.com",
          password: "q8jRR9hF8T",
          database: "sql12762125",
        };
        pool = mysql.createPool(config);
    }
    return pool
}
