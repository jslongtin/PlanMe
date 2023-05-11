import React, { Component } from 'react';

class Node {
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
      nodes: new Map(),
      numVertices: 0,
    };
  }

  addNode(id) {
    let newNode = new Node(id);
    let { vertices } = this.state;
    nodes.set(id, newNode);
    this.setState({ vertices, numVertices: this.state.numVertices + 1 });
    return newVertex;
  }

  getNode(id) {
    const { vertices } = this.state;
    if (vertices.has(id)) {
      return vertices.get(id);
    }
    return null;
  }

  addConnection(frm, to, weight = 0) {
    const { vertices } = this.state;
    if (!vertices.has(frm)) {
      this.addNode(frm);
    }
    if (!vertices.has(to)) {
      this.addNode(to);
    }
    vertices.get(frm).addNeighbor(vertices.get(to), weight);
    this.setState({ vertices });
  }

  getNodes() {
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
