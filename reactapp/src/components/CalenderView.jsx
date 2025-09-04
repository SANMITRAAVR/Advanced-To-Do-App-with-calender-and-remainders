import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = ({ tasks }) => {


  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const task = tasks.find(
        (t) => new Date(t.date).toDateString() === date.toDateString()
      );
      if (task) {
        let style = {
          borderRadius: "50%",
          color: "white",
          fontWeight: "bold",
        };
        if (task.priority === "HIGH") style.backgroundColor = "red";
        if (task.priority === "MEDIUM") {
          style.backgroundColor = "yellow";
          style.color = "black";
        }
        if (task.priority === "LOW") style.backgroundColor = "green";
        return { style };
      }
    }
    return {};
  };

  return (
    <Calendar
      tileContent={({ date, view }) => {
        const task = tasks.find(
          (t) => new Date(t.date).toDateString() === date.toDateString()
        );
        if (task) {
          let dotColor;
          if (task.priority === "HIGH") dotColor = "red";
          if (task.priority === "MEDIUM") dotColor = "yellow";
          if (task.priority === "LOW") dotColor = "green";
          return (
            <div
              style={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                backgroundColor: dotColor,
                margin: "0 auto",
                marginTop: "2px",
              }}
            ></div>
          );
        }
        return null;
      }}
    />
  );
};

export default CalendarView;
