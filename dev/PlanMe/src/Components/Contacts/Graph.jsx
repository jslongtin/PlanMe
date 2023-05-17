import React, { useState } from 'react';

class Sommet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adjacent: new Map(),
    };
  }

  addNeighbor = (neighbor, weight = 0) => {
    const { adjacent } = this.state;
    adjacent.set(neighbor, weight);
    this.setState({ adjacent: new Map(adjacent) });
  };

  removeNeighbor = (neighbor) => {
    const { adjacent } = this.state;
    adjacent.delete(neighbor);
    this.setState({ adjacent: new Map(adjacent) });
  };
  modifNeighbor = (neighbor, weight) => {
    const { adjacent } = this.state;
    adjacent.set(neighbor, weight);
    this.setState({ adjacent: new Map(adjacent) });
  };

  getConnections = () => {
    const { adjacent } = this.state;
    return adjacent.keys();
  };

  getWeight = (neighbor) => {
    const { adjacent } = this.state;
    return adjacent.get(neighbor);
  };

  render() {
    const { id } = this.props;
    return (
      <div>
        <p>ID: {id}</p>
      </div>
    );
  }
}

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sommets: new Map(),
      numsommets: 0,
    };
  }

  loadBd = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:3001/api/getContacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      data.forEach((element) => {
        let s1 = this.addSommet(element.contact);
        let s2 = this.addSommet(element.utilisateur_email);
        this.addArete(s1, s2, 1);
      });
    } else {
      alert("Request failed");
    }
  };

  addSommet = (id) => {
    const { sommets, numsommets } = this.state;
    let newSommet = new Sommet({ id }); 
    sommets.set(id, newSommet);
    this.setState({
      sommets: new Map(sommets),
      numsommets: numsommets + 1,
    });
    return newSommet;
  };

  getSommet = (id) => {
    const { sommets } = this.state;
    if (sommets.has(id)) {
      return sommets.get(id);
    }
    return null;
  };
  
  getsommets = () => {
    const { sommets } = this.state;
    return Array.from(sommets.keys());
  };

  removeSommet = (id) => { 
    const { sommets, numsommets } = this.state;
    sommets.delete(id);
    this.setState({ sommets: new Map(sommets), numsommets: numsommets - 1 });
  };

  addArete = (sommetDe, sommetTo, weight = 0) => {
    const { sommets } = this.state;
    if (!sommets.has(sommetDe.props.id)) {
      this.addSommet(sommetDe);
    }
    if (!sommets.has(sommetTo.props.id)) {
      this.addSommet(sommetTo);
    }
    
    sommetDe.addNeighbor(sommetTo, weight);
    console.log(sommetDe);
    this.setState({ sommets: new Map(sommets) });
  };

  removeArete = (sommetDe, sommetTo) => {
    const { sommets } = this.state;
    if (sommets.has(sommetDe.props.id) && sommets.has(sommetTo.props.id)) {
      sommetDe.removeNeighbor(sommetTo);
      this.setState({ sommets: new Map(sommets) });
    }
  };

  modifNeighbor = (sommetDe, sommetTo, weight) => {
    const { sommets } = this.state;
    if (sommets.has(sommetDe.props.id) && sommets.has(sommetTo.props.id)) {
      sommetDe.modifNeighbor(sommetTo, weight);
      this.setState({ sommets: new Map(sommets) });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.loadBd}>Loadbd</button>
      </div>
    );
  }
}

export default Graph;