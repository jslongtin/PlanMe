import React, { useState } from "react";
import { line } from "react-chartjs-2";

const Budget = () => {
  const [depences, setDepences] = useState([]);
  const [depence, setDepence] = useState(0);
  const [projection, setProjection] = useState(0);

  const newDepence = (e) => {
    e.preventDefault();
    if (depences) {
      setDepences([...depences, parseFloat(depence)]);
      setDepence("");
    }
  };
  const projectionAverage = () => {
    const tot = depences.reduce((a, b) => a + b, 0);
    const avg = tot / depences.length;
    setProjection(Array(12).fill(avg));
  };
  const data = {
    labels: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    datasets: [
      {
        label: "Projection depenses",
        data: projection,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return (
    <div>
      <form onSubmit={newDepence}>
        <input
          type="number"
          value={depence}
          onChange={(e) => setDepence(e.target.value)}
          placeholder="Nouvelle depence"
        />
        <button type="submit">Ajouter</button>
      </form>
      <button onClick={projectionAverage}>Projection</button>
      <Line data={data} />
    </div>
  );
};
