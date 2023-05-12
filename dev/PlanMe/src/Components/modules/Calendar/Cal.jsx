import React, { Component } from "react";
import Scheduler from "./Scheduler/Scheduler";
const data = [
  {
    id: 1,
    text: "Meeting",
    start_date: "2020-06-10 6:00",
    end_date: "2020-06-10 8:00",
  },
  {
    id: 2,
    text: "Lunch",
    start_date: "2023-05-01T12:00:00",
    end_date: "2023-05-01T13:00:00",
  },
  {
    id: 3,
    text: "Presentation",
    start_date: "2023-05-01T14:00:00",
    end_date: "2023-05-01T15:00:00",
  },
];
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
        await this.createEvent(id,ev.text, ev.start_date, ev.end_date);
        break;
      case "update":
        await this.updateEvent(id, ev.text, ev.start_date, ev.end_date);
        break;
      case "delete":
        console.log(ev.text);
        console.log(ev);
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

  async createEvent(id, text, start_date, end_date) {
    const user_email = sessionStorage.getItem("email");
    const response = await fetch(
      "http://localhost:3001/api/calendrier/new_event",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id, text, start_date, end_date, user_email }),
      }
    );
    const events = await this.fetchEvents();
    this.setState({events});
  }

  async updateEvent(id, text, start_date, end_date) {
    const response = await fetch(
      `http://localhost:3001/api/calendrier/update_event/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, start_date, end_date }),
      }
    );
  }

  async deleteEvent(id, text) {
    const user_email = sessionStorage.getItem("email");
    console.log(id,text);
    const response = await fetch(
      "http://localhost:3001/api/calendrier/delete_event",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id, text}),
      }
    );
  }

  fetchEvents = async () => {
    try {
    const email = sessionStorage.getItem("email");
    const response = await fetch(
      `http://localhost:3001/api/calendrier/events?email=${encodeURIComponent(email)}` //encodeURIComponent - ref : https://www.geeksforgeeks.org/javascript-encodeuri-decodeuri-and-its-components-functions/
    );
    const events = await response.json();
    
    this.setState({ events });
    return events;
  }catch(err){
    console.log(err);
    return [];
  }
}

  async componentDidMount() {
    const events = await this.fetchEvents();
    this.setState({ events });
    console.log("state events :")
    console.log(events)
  }

  render() {
    const { currentTimeFormatState, messages } = this.state;
    return (
      <div className="min-h-screen w-full bg-gray-500 relative  z-0 overflow-y: scroll;">
        <div className="h-full w-full flex-grow mx-auto max-w-7xl min-h-0 p-4 overflow-y: scroll;">
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
