import React, { useState } from "react";
import { addReminderToTask } from "../api";

export default function ReminderForm({ taskId, onReminderAdded }) {
  const [reminderDate, setReminderDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReminderToTask(taskId, {
        reminder_date: reminderDate,
        status: "PENDING",
        message,
      });
      onReminderAdded(); 
      setReminderDate("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to add reminder");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
      <input
        type="datetime-local"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
        required
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="text"
        placeholder="Reminder message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        style={{ marginRight: "0.5rem" }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#3D5AFE",
          color: "#fff",
          padding: "0.3rem 0.6rem",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add Reminder
      </button>
    </form>
  );
}
