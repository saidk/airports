import {database, host, password, port, user} from "./config";

const { Pool } = require('pg');
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});
module.exports = {
    query: (text: any, params: any, callback: any) => {
        return pool.query(text, params, callback)
    },
};
