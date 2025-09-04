import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext.jsx";
import { getTasks } from "../api";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";

export default function CalendarPage() {
  const { user } = useAuth();
  const userId = user?.id;

  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForDate, setTasksForDate] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(userId);
        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      }
    };
    if (userId) fetchTasks();
  }, [userId]);

  useEffect(() => {
    const filtered = tasks.filter(
      (t) =>
        t.deadline_date &&
        new Date(t.deadline_date).toDateString() ===
          selectedDate.toDateString()
    );
    setTasksForDate(filtered);
  }, [selectedDate, tasks]);

  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const tasksOnDate = tasks.filter(
        (t) =>
          t.deadline_date &&
          new Date(t.deadline_date).toDateString() === date.toDateString()
      );
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2px",
            marginTop: "2px",
          }}
        >
          {tasksOnDate.map((task, idx) => {
            let dotColor;
            if (task.priority === "HIGH") dotColor = "red";
            else if (task.priority === "MEDIUM") dotColor = "yellow";
            else dotColor = "green";

            return (
              <div
                key={idx}
                style={{
                  height: "8px",
                  width: "8px",
                  borderRadius: "50%",
                  backgroundColor: dotColor,
                }}
              ></div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            width: "100%",
            padding: "1rem 2rem",
            backgroundColor: "#3D5AFE",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          Task Calendar
        </div>

        <main
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "#f5f7ff",
            minHeight: "100vh",
          }}
        >
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={renderTileContent}
          />

          {/* Task details for selected date */}
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#3D5AFE", marginBottom: "1rem" }}>
              Tasks for {selectedDate.toDateString()}
            </h3>

            {tasksForDate.length === 0 ? (
              <p>No tasks for this date.</p>
            ) : (
              <table
                border="1"
                cellPadding="5"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead style={{ backgroundColor: "#3D5AFE", color: "#fff" }}>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksForDate.map((task) => (
                    <tr key={task.id} style={{ textAlign: "center" }}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
