import {Graph} from "../models/Graph";

class AirportService {
    private graph: Graph;

    constructor() {
        this.graph = new Graph();
        this.graph.getAirports();
        this.graph.getRoutes();
        // bonus task
        this.graph.addEdgesInOneHundredKM();
    }

    findPathBetweenAirports(sourceAirport: string, destinationAirport: string): string {
        return this.graph.dijkstra(sourceAirport, destinationAirport);
    }
}

export default new AirportService();
