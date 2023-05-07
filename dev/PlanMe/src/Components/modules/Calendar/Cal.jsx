import React, { Component } from "react";
import Scheduler from "./Scheduler/Scheduler";

class Cal extends Component {
  state = {
    currentTimeFormatState: true,
    messages: [],
    events: [],
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [newMessage, ...this.state.messages];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = async (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : "";
    const message = `event ${action}: ${id} ${text}`;
    this.addMessage(message);
    switch (action) {
      case "create":
        await this.createEvent(ev.text, ev.start_date, ev.end_date);
        break;
      case "update":
        await this.updateEvent(id, ev.text, ev.start_date, ev.end_date);
        break;
      case "delete":
        await this.deleteEvent(id);
        break;
      default:
        console.log("Unknown action");
    }
  };

  handleTimeFormatStateChange = (state) => {
    this.setState({
      currentTimeFormatState: state,
    });
  };

  async createEvent(title, start_date, end_date) {
    const response = await fetch(
      "http://localhost:3001/api/calendrier/new_event",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, start_date, end_date }),
      }
    );
    const events = await this.fetchEvents();
    this.setState({events});
    return response.json();
  }

  async updateEvent(id, title, start_date, end_date) {
    const response = await fetch(
      `http://localhost:3001/api/calendrier/update_event/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, start_date, end_date }),
      }
    );
    return response.json();
  }

  async deleteEvent(id) {
    const response = await fetch(
      `http://localhost:3001/api/calendrier/delete_event/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/calendrier/events"
      );
      const events = await response.json();
      this.setState({ events });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  render() {
    const { currentTimeFormatState, messages } = this.state;
    return (
      <div className="min-h-screen w-full bg-gray-500 relative z-0">
        <div className="h-full w-full flex-grow mx-auto max-w-7xl min-h-0 p-4">
          <Scheduler
            events={this.state.events}
            timeFormatState={currentTimeFormatState}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
      </div>
    );
  }
}
// scheduler ref: How to Create a React Scheduler App - DHTMLX Tutorial : https://www.youtube.com/watch?v=UdmAB5Hoqxg

export default Cal;
