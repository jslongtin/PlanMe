// ref: https://medium.com/outco/how-to-build-a-graph-data-structure-d779d822f9b4
// ref: https://chat.openai.com/?model=text-davinci-002-render-sha
import React, { Component } from 'react';

class Vertex {
  constructor(id) {
    this.id = id;
    this.adjacent = new Map();
  }

  addNeighbor(neighbor, weight = 0) {
    this.adjacent.set(neighbor, weight);
  }

  getConnections() {
    return this.adjacent.keys();
  }

  getId() {
    return this.id;
  }

  getWeight(neighbor) {
    return this.adjacent.get(neighbor);
  }
}

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertices: new Map(),
      numVertices: 0,
    };
  }

  addVertex(id) {
    const newVertex = new Vertex(id);
    const { vertices } = this.state;
    vertices.set(id, newVertex);
    this.setState({ vertices, numVertices: this.state.numVertices + 1 });
    return newVertex;
  }

  getVertex(id) {
    const { vertices } = this.state;
    if (vertices.has(id)) {
      return vertices.get(id);
    }
    return null;
  }

  addEdge(frm, to, weight = 0) {
    const { vertices } = this.state;
    if (!vertices.has(frm)) {
      this.addVertex(frm);
    }
    if (!vertices.has(to)) {
      this.addVertex(to);
    }
    vertices.get(frm).addNeighbor(vertices.get(to), weight);
    this.setState({ vertices });
  }

  getVertices() {
    const { vertices } = this.state;
    return Array.from(vertices.keys());
  }

  render() {
    return (
      <div>
        {/* your code here */}
      </div>
    );
  }
}

export default Graph;
