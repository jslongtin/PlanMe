/***************************************************** 
  Fichier: Graph.jsx
  Contexte: Structure de données graph fait par nous et algorithme de suggestion de contacts
  Auteur:  Jessika Longtin et Finnegan Simpson 
 *****************************************************/
import React, { useState } from 'react';

class Sommet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adjacent: new Map(),
    };
  }
  equals = (otherSommet) => {
    return this.props.id === otherSommet.props.id;
  };
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
    return Array.from(adjacent.keys());
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
    const response = await fetch("http://127.0.0.1:3001/api/getContacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();

      data.forEach((element) => {
        let s1 = this.addSommet(element.contact);
        let s2 = this.addSommet(element.utilisateur_email);
        this.addArete(s1, s2, 1);
      });
      let user = sessionStorage.getItem("email");

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

  // ********************************************************************************************************************
  // Algorythme de Dijkstra pour trouver le plus court chemin entre deux sommets avec le poids des aretes
  // vus dans notre cours de mathématiques
  // ref: https://chat.openai.com/  Pour debuggage et amélioration de l'algorythme
  findPathWithDijkstra = (startNode, endNode) => {
    const { sommets } = this.state;
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = new Set(sommets);
    while (unvisitedNodes.size > 0) {
      let closestNode = null;
      for (const node of unvisitedNodes) {
        if (closestNode === null || node.distance < closestNode.distance) {
          closestNode = node;
        }
      }
      unvisitedNodes.delete(closestNode);
      if (closestNode === endNode) {
        return visitedNodesInOrder;
      }
      closestNode = closestNode[1]
      closestNode.getConnections().forEach((neighbor) => {
        if (!unvisitedNodes.has(neighbor)) {
          return;
        }
        const distance = closestNode.getWeight(neighbor) + closestNode.distance;
        if (distance < neighbor.distance) {
          neighbor.distance = distance;
          neighbor.previousNode = closestNode;
        }
      });
      visitedNodesInOrder.push(closestNode);
    }
    return visitedNodesInOrder;
  };

  suggestContacts = (id, limit = Infinity) => {
    let { sommets } = this.state;
    let suggestedContacts = [];
    let startSommet = this.getSommet(id);

    // trouve le plus court chemin entre le sommet de départ et tous les autres sommets
    let shortestPaths = new Map();
    sommets.forEach((sommet) => {
      sommet.distance = Infinity;
      sommet.previousNode = null;
    });
    startSommet.distance = 0;
    let visitedNodesInOrder = this.findPathWithDijkstra(startSommet, null);
    visitedNodesInOrder.forEach((node) => {
      shortestPaths.set(node, node.distance);
    });

    // trouve les suggestions de contacts selon le plus court chemin 
    // et le poids des aretes en limiant le nombre de suggestions
    sommets.forEach((sommet) => {
      if (sommet !== startSommet) {
        let path = this.findPathWithDijkstra(startSommet, sommet);
        if (path && path.length > 1) {
          startSommet.getConnections().forEach((neighbor) => {
            if (!neighbor.equals(sommet)) {
              let weight = shortestPaths.get(sommet);
              suggestedContacts.push({ sommet, path, weight });
            }
          });
        }
      }
    });
    suggestedContacts.sort((a, b) => a.weight - b.weight);

    let limitedContacts = suggestedContacts.slice(0, limit);
    return limitedContacts;
  };

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Graph;
