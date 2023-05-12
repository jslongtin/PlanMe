import React, { useState } from 'react';

function Sommet({ id }) {
  let [adjacent, setAdjacent] = useState(new Map());

  const addNeighbor = (neighbor, weight = 0) => {
    adjacent.set(neighbor, weight);
    setAdjacent(new Map(adjacent));
  };

  const getConnections = () => {
    return adjacent.keys();
  };

  const getWeight = (neighbor) => {
    return adjacent.get(neighbor);
  };

  return (
    <div>
      <p>ID: {id}</p>
    </div>
  );
}

function Graph() {
  let [sommets, setSommets] = useState(new Map());
  let [numsommets, setNumsommets] = useState(0);


  const loadBd  = async (e) => {
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
        
        data.forEach(element => {
          let s1 = addSommet(element.contact)
          let s2 = addSommet(element.utilisateur_email)
          console.log(s1);
          addArete(s1,s2,1)
        });

        
      } else {
        alert("Request failed");
      }
  };

  const addSommet = (id) => {
    let newSommet = <Sommet id={id} />;
    sommets.set(id, newSommet);
    setSommets(new Map(sommets));
    setNumsommets(numsommets + 1);
    return newSommet;
  };

  const getSommet = (id) => {
    if (sommets.has(id)) {
      return sommets.get(id);
    }
    return null;
  };

  const addArete = (sommetDe, sommetTo, weight = 0) => {
  
    if (!sommets.has(sommetDe.id)) {
      addSommet(sommetDe);
    }
    if (!sommets.has(sommetTo.id)) {
      addSommet(sommetTo);
    }
    sommetDe.addNeighbor(sommetTo, weight);
    setSommets(new Map(sommets));
  };

  const getsommets = () => {
    return Array.from(sommets.keys());
  };

  return (
    <div>
      <button onClick={loadBd}>Loadbd</button>
    
    </div>
  );
}

export default Graph;
