/***************************************************** 
  Fichier: Scheduler.jsx
  Contexte: Librairie de calendrier externe
  Auteur: Finnegan Simpson et Jessika Longtin
 *****************************************************/
// ref : https://github.com/DHTMLX
// https://docs.dhtmlx.com/scheduler/howtostart_nodejs.html
// https://www.youtube.com/watch?v=UdmAB5Hoqxg
import React, { Component } from "react";
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";

const scheduler = window.scheduler;

export default class Scheduler extends Component {
  initSchedulerEvents() {
    if (scheduler._$initialized) {
      return;
    }

    const onDataUpdated = this.props.onDataUpdated;

    scheduler.attachEvent("onEventAdded", (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated("create", ev, id);
      }
    });

    scheduler.attachEvent("onEventChanged", (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated("update", ev, id);
      }
    });

    scheduler.attachEvent("onEventDeleted", (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated("delete", ev, id);
      }
    });
    scheduler._$initialized = true;
  }

  componentDidMount() {
    scheduler.skin = "material";
    scheduler.config.header = [
      "day",
      "week",
      "month",
      "date",
      "prev",
      "today",
      "next",
    ];
    scheduler.config.hour_date = "%g:%i %A";
    scheduler.xy.scale_width = 70;

    this.initSchedulerEvents();

    const { events } = this.props;
    scheduler.init(this.schedulerContainer, new Date());
    scheduler.clearAll();
    scheduler.parse(events);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.timeFormatState !== nextProps.timeFormatState || this.props.events !== nextProps.events;;
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
        scheduler.clearAll();
        scheduler.parse(this.props.events);
    }
    scheduler.render();
  }

  setHoursScaleFormat(state) {
    scheduler.config.hour_date = state ? "%H:%i" : "%g:%i %A";
    scheduler.templates.hour_scale = scheduler.date.date_to_str(
      scheduler.config.hour_date
    );
  }

  render() {
    const { timeFormatState } = this.props;
    this.setHoursScaleFormat(timeFormatState);
    return (
      <div
        ref={(input) => {
          this.schedulerContainer = input;
        }}
        className="w-full h-full overflow-auto: overlay  relative z-0"
      ></div>
    );
  }
}
