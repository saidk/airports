# airports
Node js HTTP API endpoint that takes as input two IATA airport codes and provides as output a route between these two airports

## Installation

Firstly, it is required to boot the postgres database using docker.

```bash
docker-compose up
```
Then, to run the server you can use this command:

```bash
npm start
```

Note that, during booting the server I applied the migration logic manually, which asynchronously writes airports and routes to the database.

To access the actual endpoint you can open this link in the browser or Postman: http://localhost:3000/airports?sourceAirport=IST&destinationAirport=KZN. No authorization is required.

Also, there is some tests to verify the logic of a Graph class, which can be run using:


```bash
npm run test
```
