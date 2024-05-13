import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const index = () => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "#3174ad";

    switch (event.type) {
      case "allday":
        backgroundColor = "#FFA500";
        break;
      case "long":
        backgroundColor = "#32CD32";
        break;
      case "dts-start":
        backgroundColor = "#FF4500";
        break;
      case "dts-end":
        backgroundColor = "#8A2BE2";
        break;
      case "some":
        backgroundColor = "#FF69B4";
        break;
      case "conference":
        backgroundColor = "#FFFF00";
        break;
      case "meeting":
        backgroundColor = "#e91e63";
        break;
      case "lunch":
        backgroundColor = "#FFD700";
        break;
      case "happy-hour":
        backgroundColor = "#4CAF50";
        break;
      case "dinner":
        backgroundColor = "#8B4513";
        break;
      case "birthday-party":
        backgroundColor = "#FF1493";
        break;
      case "late-night":
        backgroundColor = "#0000FF";
        break;
      case "multi-day":
        backgroundColor = "#800080";
        break;
      default:
        backgroundColor = "#3174ad";
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        defaultDate={new Date(2015, 3, 1)}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default index;
