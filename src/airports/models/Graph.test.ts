import { Graph } from "./Graph";
import { Location } from "./Location";

test('Find the shortest route between two vertexes', () => {
    const graph = new Graph();

    graph.addVertex(new Location(37, 31), 'A');
    graph.addVertex(new Location(37, 31), 'B');
    graph.addVertex(new Location(37, 31), 'C');
    graph.addVertex(new Location(37, 31), 'D');
    graph.addVertex(new Location(37, 31), 'E');
    graph.addVertex(new Location(37, 31), 'F');

    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 3);
    graph.addEdge('B', 'C', 2);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('B', 'E', 1);
    graph.addEdge('C', 'E', 1);
    graph.addEdge('C', 'D', 6);
    graph.addEdge('E', 'F', 4);
    graph.addEdge('D', 'F', 2);

    expect(graph.dijkstra('A', 'F')).toBe('F <= E <= B <= A');
});

test('Algorithm takes route "I <= D <= B <= A" although there is a shorter route "I <= G <= F <= E <= B <= A"', () => {
    const graph = new Graph();

    graph.addVertex(new Location(37, 31), 'A');
    graph.addVertex(new Location(37, 31), 'B');
    graph.addVertex(new Location(37, 31), 'C');
    graph.addVertex(new Location(37, 31), 'D');
    graph.addVertex(new Location(37, 31), 'E');
    graph.addVertex(new Location(37, 31), 'F');
    graph.addVertex(new Location(37, 31), 'G');
    graph.addVertex(new Location(37, 31), 'H');
    graph.addVertex(new Location(37, 31), 'I');

    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 3);
    graph.addEdge('B', 'C', 2);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('B', 'E', 1);
    graph.addEdge('C', 'E', 1);
    graph.addEdge('C', 'D', 6);
    graph.addEdge('E', 'F', 4);
    graph.addEdge('F', 'G', 1);
    graph.addEdge('G', 'I', 1);
    graph.addEdge('D', 'I', 6);

    expect(graph.dijkstra('A', 'I')).toBe('I <= D <= B <= A');
});

test('Find the shortest route between two airports considering airports in 100 km radius', () => {
    const graph = new Graph();

    graph.addVertex(new Location(37.1232, 31.5325), 'A');
    graph.addVertex(new Location(43, 22), 'B');
    graph.addVertex(new Location(41, 28), 'C');
    graph.addVertex(new Location(37.2590, 31.6460), 'D');
    graph.addVertex(new Location(45, 42), 'E');
    graph.addVertex(new Location(26, 27), 'F');

    graph.addEdge('A', 'B', 500);
    graph.addEdge('A', 'C', 450);
    graph.addEdge('B', 'C', 604);
    graph.addEdge('B', 'D', 388);
    graph.addEdge('B', 'E', 652);
    graph.addEdge('C', 'E', 125);
    graph.addEdge('C', 'D', 405);
    graph.addEdge('E', 'F', 250);
    graph.addEdge('D', 'F', 200);

    graph.addEdgesInOneHundredKM();

    expect(graph.dijkstra('A', 'F')).toBe('F <= D <= A');
});


