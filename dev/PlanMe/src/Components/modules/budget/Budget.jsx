/***************************************************** 
  Fichier: Budget.jsx
  Contexte: 
  Auteur: Finnegan Simpson et Jessika Longtin
 *****************************************************/
// refs :algorithme -> chat gpt | Chart.js -> https://www.youtube.com/watch?v=Ly-9VTXJlnA
import React, { Component } from "react";
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
);

class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      depences: Array(12).fill(0), // Initialize with 12 months of 0 depenses
      depence: "",
      projection: [],
    };
  }

  options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} €`,
        },
      },
    },
  };

  addDepence = async (e) => {
    e.preventDefault();
    const { depences, depence } = this.state;
    if (depence) {
      try {
        const email = sessionStorage.getItem("email");
        const currentMonth = new Date().getMonth();
        const updatedDepences = [...depences];
        updatedDepences[currentMonth] += parseFloat(depence);
        this.setState({
          depences: updatedDepences,
          depence: "",
        });
        const response = await fetch(
          "http://localhost:3001/api/budget/new_depence",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              echeance: new Date().toISOString(),
              depenses: parseFloat(depence),
              user_email: email,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error("An error occurred while adding depence:", err);
      }
    }
  };

  calculateProjection = () => {
    const { depences } = this.state;
    const currentMonth = new Date().getMonth();
    const pastMonths = depences.slice(0, currentMonth + 1);
    const avg = pastMonths.reduce((a, b) => a + b, 0) / pastMonths.length;
    const growthRate = (depences[currentMonth] - depences[0]) / currentMonth;
    let lastProjectedValue = depences[currentMonth];
    const projection = [];
    for (let i = currentMonth + 1; i < 12; i++) {
      const projectedValue = lastProjectedValue + growthRate;
      projection.push(projectedValue);
      lastProjectedValue = projectedValue;
    }
    this.setState({
      projection: projection,
    });
  };

  fetchDepences = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const response = await fetch(
        `http://localhost:3001/api/budget/depences?email=${encodeURIComponent(
          email
        )}`
      );
      const depences = await response.json();

      const updatedDepences = Array(12).fill(0);
      depences.forEach((depence) => {
        const month = new Date(depence.echeance).getMonth();
        if (month >= 0 && month <= 11) {
          updatedDepences[month] += depence.depenses;
        }
      });

      this.setState({ depences: updatedDepences }, this.calculateProjection);
      return updatedDepences;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  async componentDidMount() {
    const depences = await this.fetchDepences();
    this.setState({ depences });
    console.log("state depences :");
    console.log(depences);
  }

  render() {
    const { depences, depence, projection } = this.state;

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
          label: "Dépenses réelles",
          data: depences,
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
        {
          label: "Projection dépenses",
          data: [...Array(new Date().getMonth()).fill(null), ...projection],
          fill: false,
          backgroundColor: "rgb(0, 123, 255)",
          borderColor: "rgba(0, 123, 255, 0.2)",
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
      ],
    };

    return (
      <div>
        <form onSubmit={this.addDepence}>
          <input
            type="number"
            value={depence}
            onChange={(e) => this.setState({ depence: e.target.value })}
            placeholder="Nouvelle dépense"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Ajouter
          </button>
        </form>
        <button
          onClick={this.calculateProjection}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Projection
        </button>
        {depences && depences.length > 0 && (
          <div className="text-black">
            <table className="w-full divide-y divide-green-500 bg-green-400 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-green-300">
                <tr>
                  {data.labels.map((label, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-green-200 divide-y divide-green-200">
                <tr>
                  {depences.map((depence, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{depence} €</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            <Line data={data} options={this.options} />
          </div>
        )}
      </div>
    );
  }
}

export default Budget;
