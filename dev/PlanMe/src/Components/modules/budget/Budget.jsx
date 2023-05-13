import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement
); //ref debug : chat gpt

const Budget = () => {
  const [depences, setDepences] = useState([
    100, 200, 150, 300, 250, 200, 300, 350, 400, 450, 500, 550,
  ]);
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
    const avg = depences.reduce((a, b) => a + b, 0) / depences.length;
    const currentMonth = new Date().getMonth();
    const projectedValues = depences.map((value, index) =>
      index <= currentMonth ? value : avg
    );
    setProjection(projectedValues);
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
        label: "Projection dépenses",
        data: projection,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        elements: {
          line: {
            borderWidth: 2,
            tension: 0,
          },
          point: {
            radius: 5,
          },
        },
      },
    ], // ref :
  };
  const customTooltip = (context) => {
    const { chart, tooltip } = context;
    const point = chart.getPointByIndex(tooltip.dataPoints[0].index);
    const value = chart.data.datasets[0].data[point.dataIndex];
    tooltip.body[0].lines[0] = `${value} €`;
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} €`,
        },
      },
    },
  };

  // ref : Labels over dots in graph : chat gpt
  return (
    <div>
      <form onSubmit={newDepence}>
        <input
          type="number"
          value={depence}
          onChange={(e) => setDepence(e.target.value)}
          placeholder="Nouvelle depence"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Ajouter
        </button>
      </form>
      <button
        onClick={projectionAverage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Projection
      </button>
      {depences && depences.length > 0 && (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default Budget;
