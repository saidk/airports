const db = require('../db');
const fs = require('fs');

export function migrate() {
    const createAirports = 'CREATE TABLE IF NOT EXISTS airports ( id SERIAL PRIMARY KEY, name VARCHAR(256),' +
        ' city VARCHAR(256), country VARCHAR(256), iata VARCHAR(256), icao VARCHAR(256), latitude DECIMAL ,' +
        ' longitude DECIMAL, altitude VARCHAR(256), timezone VARCHAR(256), dst VARCHAR(256), tz VARCHAR(256),' +
        ' type VARCHAR(256), source VARCHAR(256)); DELETE FROM airports';

    db.query(createAirports, () => {
        console.log('created airports table');
    });

    const airports = fs.readFileSync('airports.txt').toString();

    db.query(airports, () => {
        console.log('migrated airports');
    });

    const createRoutes = 'CREATE TABLE IF NOT EXISTS routes ( airline VARCHAR(256), airline_id INTEGER,' +
        ' source_airport VARCHAR(256), source_airport_id INTEGER, destination_airport VARCHAR(256), destination_airport_id INTEGER ,' +
        ' code_share VARCHAR(256), stops VARCHAR(256), equipment VARCHAR(256)); DELETE FROM routes';

    db.query(createRoutes, () => {
        console.log('created routes table');
    });

    const routes = fs.readFileSync('routes.txt').toString();

    db.query(routes, () => {
        console.log('migrated routes');
    });
}