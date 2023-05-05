// undirected unweighted graph
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }
  addVertex(vertex) {
    // vertex 가 없는 경우 추가!
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  addEdge(vertex1, vertex2) {
    // vertex 존재 여부 확인
    if (!this.adjacencyList.has(vertex1)) this.addVertex(vertex1);
    if (!this.adjacencyList.has(vertex2)) this.addVertex(vertex2);
    // edge 존재 여부 확인
    let edges1 = this.adjacencyList.get(vertex1);
    let edges2 = this.adjacencyList.get(vertex2);
    if (!edges1.includes(vertex2)) this.adjacencyList.set(vertex1, [...edges1, vertex2]);
    if (!edges2.includes(vertex1)) this.adjacencyList.set(vertex2, [...edges2, vertex1]);
  }
  removeEdge(vertex1, vertex2) {
    // vertex 존재 여부 확인
    // edge 에 상대 vertex 존재 여부 확인
    if (this.adjacencyList.has(vertex1) && this.adjacencyList.get(vertex1).includes(vertex2)) {
      const filtered = this.adjacencyList.get(vertex1).filter((v) => v !== vertex2);
      this.adjacencyList.set(vertex1, filtered);
    }
    if (this.adjacencyList.has(vertex2) && this.adjacencyList.get(vertex2).includes(vertex1)) {
      const filtered = this.adjacencyList.get(vertex2).filter((v) => v !== vertex1);
      this.adjacencyList.set(vertex2, filtered);
    }
  }
  removeVertex(vertex) {
    // vertex 존재 여부 확인
    if (!this.adjacencyList.has(vertex)) {
      // edge의 반대편 vertex에서도 제거
      const edges = this.adjacencyList.get(vertex);
      edges.forEach((vertex2) => this.removeEdge(vertex, vertex2));
    }
    // vertex 제거
    this.adjacencyList.delete(vertex);
  }
}
