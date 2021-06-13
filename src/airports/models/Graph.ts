import {Location} from "./Location";
import {Airport} from "./Airport";
import {Route} from "./Route";
import {Dictionary} from "./Dictionary";
import {Airports} from "./Airports";

class Graph {
    private vertices: Array<string>;
    private verticesLocation: Dictionary<Location>;
    private adjacencyList: any;
    private latLonAirports: Airports[][];
    private db: any;

    constructor() {
        this.vertices = [];
        this.verticesLocation = {};
        this.adjacencyList = {};
        this.latLonAirports = [];
        this.db = require('../../db');
    }

    addVertex(location: Location, iata: string) {
        this.vertices.push(iata);
        this.verticesLocation[iata] = location;
        this.adjacencyList[iata] = {};
        if (this.latLonAirports[Math.trunc(location.latitude)] == undefined) {
            this.latLonAirports[Math.trunc(location.latitude)] = [];
        }
        if (this.latLonAirports[Math.trunc(location.latitude)][Math.trunc(location.longitude)] == undefined) {
            this.latLonAirports[Math.trunc(location.latitude)][Math.trunc(location.longitude)] = new Airports();
        }

        this.latLonAirports[Math.trunc(location.latitude)][Math.trunc(location.longitude)].addAirport(iata);
    }

    addEdge(iataSource: string, iataDestination: string, weight: number) {
        if (this.adjacencyList[iataSource] !== undefined) {
            this.adjacencyList[iataSource][iataDestination] = weight;
        }
    }

    addEdgesInOneHundredKM() {
        this.vertices.map(iataSource => {
            const latitudeSource = this.verticesLocation[iataSource].latitude;
            const longitudeSource = this.verticesLocation[iataSource].longitude;
            const nearByAirports = this.latLonAirports[Math.trunc(latitudeSource)][Math.trunc(longitudeSource)];
            nearByAirports.airports.map(iataDestination => {
                if (iataDestination !== iataSource) {
                    const locationDestination = this.verticesLocation[iataDestination];
                    const weight = Graph.calculateDistance(
                        latitudeSource, longitudeSource, locationDestination.latitude, locationDestination.longitude
                    );
                    if (weight <= 100) {
                        this.addEdge(iataSource, iataDestination, weight);
                    }
                }
            });
        });
    }

    getAirports() {
        this.db.query('SELECT * FROM airports', (error: any, results: any) => {
            if (error) {
                throw error;
            }
            results.rows.map((row: Airport) => {
                this.addVertex(new Location(row.latitude, row.longitude), row.iata);
            });
        });
    }

    getRoutes() {
        this.db.query('SELECT * FROM routes', (error: any, results: any) => {
            if (error) {
                throw error;
            }
            results.rows.map((row: Route) => {
                // TODO change db values with snake case to camel case for persistency
                const sourceAirport = this.verticesLocation[row.source_airport];
                const destinationAirport = this.verticesLocation[row.destination_airport];
                let weight = 0;
                if (sourceAirport === undefined || destinationAirport === undefined) {
                    weight = Math.max();
                } else {
                    weight = Graph.calculateDistance(
                        sourceAirport.latitude,
                        sourceAirport.longitude,
                        destinationAirport.latitude,
                        destinationAirport.longitude
                    );
                }
                this.addEdge(row.source_airport, row.destination_airport, weight)
            });
        });
    }

    static calculateDistance(latSource: number, lonSource: number, latDestination: number, lonDestination: number) {
        if ((latSource == latDestination) && (lonSource == lonDestination)) {
            return 0;
        }
        else {
            const radLatSource = Math.PI * latSource / 180;
            const radLatDestination = Math.PI * latDestination / 180;
            const theta = lonSource - lonDestination;
            const radTheta = Math.PI * theta / 180;
            let dist = Math.sin(radLatSource) * Math.sin(radLatDestination) + Math.cos(radLatSource)
                * Math.cos(radLatDestination) * Math.cos(radTheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            return dist * 1.609344;
        }
    }

    dijkstra(source: string, destination: string) {
        let distances: any = {},
            parents: any = {},
            visited = new Set();
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.vertices[i]] = Infinity;
            }
            parents[this.vertices[i]] = null;
        }

        let currVertex = Graph.vertexWithMinDistance(distances, visited);

        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                const vertexAmount = Graph.findAmountOfVertexesToTheSource(
                    destination, neighbor, currVertex, source, parents
                );
                if (distances[neighbor] > newDistance && vertexAmount <= 4) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currVertex;
                }
            }
            visited.add(currVertex);
            currVertex = Graph.vertexWithMinDistance(distances, visited);
        }
        let path = destination;
        let vertex = destination;
        while (parents[vertex] !== source) {
            vertex = parents[vertex];
            path += ' <= ' + parents[vertex];
        }
        path += ' <= ' + source;

        return path;
    }

    static findAmountOfVertexesToTheSource(
        destination: string,
        neighbor: string,
        currVertex: string,
        source: string,
        parents: any,
    ) {
        let vertexAmount = 1;
        if (destination === neighbor) {
            let vertex = currVertex;
            if (vertex !== source) {
                vertexAmount = vertexAmount + 1;
                while (parents[vertex] !== source) {
                    vertex = parents[vertex];
                    vertexAmount = vertexAmount + 1;
                }
            }
        }
        return vertexAmount;
    }

    static vertexWithMinDistance(distances: any, visited: Set<any>) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }
}

export {Graph};
