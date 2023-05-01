import React, { Component } from "react";
import Scheduler from "./Scheduler/Scheduler";

const dataa = [
  {
    start_date: "2020-06-10 6:00",
    end_date: "2020-06-10 8:00",
    text: "Event 1",
    id: 1,
  },
  {
    start_date: "2020-06-13 10:00",
    end_date: "2020-06-13 18:00",
    text: "Event 2",
    id: 2,
  },
];
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

  logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : "";
    const message = `event ${action}: ${id} ${text}`;
    this.addMessage(message);
  };

  handleTimeFormatStateChange = (state) => {
    this.setState({
      currentTimeFormatState: state,
    });
  };

  render() {
    const { currentTimeFormatState, messages } = this.state;
    return (
      <div className="min-h-screen w-full bg-gray-500">
        <div className="h-full w-full flex-grow mx-auto max-w-7xl min-h-0 p-4">
          <Scheduler
            events={data}
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
