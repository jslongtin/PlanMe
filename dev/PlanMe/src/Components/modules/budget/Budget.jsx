/***************************************************** 
  Fichier: .jsx
  Contexte: 
  Auteur: Finnegan Simpson et Jessika Longtin
 *****************************************************/
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
      depences: [],
      depence: "",
      projection: 0,
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
        const response = await fetch("/api/budget/new_depence", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            echeance: new Date().toISOString().split("T")[0], // Set the current date as the echeance ref : chatgpt
            depenses: parseFloat(depence),
            user_email: email,
          }),
        });

        if (response.ok) {
          const newDepences = [...depences, parseFloat(depence)];
          this.setState({
            depences: newDepences,
            depence: "",
          });
        } else {
          console.error("Failed to add depence:", response.status);
        }
      } catch (err) {
        console.error("An error occurred while adding depence:", err);
      }
    }
  };

  calculateProjection = () => {
    const { depences } = this.state;
    const currentMonth = new Date().getMonth();
    const avg = depences.reduce((a, b) => a + b, 0) / depences.length;
    const projection = [];
    for (let i = currentMonth + 1; i < 12; i++) {
      projection.push(avg);
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
        )}` //encodeURIComponent - ref : https://www.geeksforgeeks.org/javascript-encodeuri-decodeuri-and-its-components-functions/
      );
      const depences = await response.json();

      this.setState({ depences });
      return depences;
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
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Dépense</th>
                </tr>
              </thead>
              <tbody>
                {depences.map((depence, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{depence} €</td>
                  </tr>
                ))}
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

//reformated in class from const by chatgpt
