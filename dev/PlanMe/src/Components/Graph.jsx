// ref: https://medium.com/outco/how-to-build-a-graph-data-structure-d779d822f9b4
// ref: https://chat.openai.com/?model=text-davinci-002-render-sha
import React, { Component } from 'react';

class Sommet {
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
      sommets: new Map(),
      numsommets: 0,
    };
  }

  addSommet(id) {
    let newSommet = new Sommet(id);
    let { sommets } = this.state;
    sommets.set(id, newSommet);
    this.setState({ sommets, numsommets: this.state.numsommets + 1 });
    return newSommet;
  }

  getSommet(id) {
    let { sommets } = this.state;
    if (sommets.has(id)) {
      return sommets.get(id);
    }
    return null;
  }

  addArete(frm, to, weight = 0) {
    let { sommets } = this.state;
    if (!sommets.has(frm)) {
      this.addSommet(frm);
    }
    if (!sommets.has(to)) {
      this.addSommet(to);
    }
    sommets.get(frm).addNeighbor(sommets.get(to), weight);
    this.setState({ sommets });
  }

  getsommets() {
    let { sommets } = this.state;
    return Array.from(sommets.keys());
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
