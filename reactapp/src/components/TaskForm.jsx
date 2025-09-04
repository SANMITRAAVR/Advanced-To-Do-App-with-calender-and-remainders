import React, { useState } from "react";
import { addTask } from "../api";

export default function TaskForm({ userId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [status, setStatus] = useState("PENDING");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !date) {
      alert("All fields are required");
      return;
    }

    await addTask(userId, {
      title,
      description: desc,
      deadline_date: date,
      priority,
      status,
    });

    setTitle("");
    setDesc("");
    setDate("");
    setPriority("LOW");
    setStatus("PENDING");
    onTaskAdded();
  };

  const inputStyle = {
    padding: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    flex: 1,
  };

  const textareaStyle = {
    padding: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    flex: 2,
    resize: "vertical",
  };

  const selectStyle = {
    padding: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3D5AFE",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={textareaStyle}
        rows={1}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={selectStyle}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={selectStyle}
      >
        <option value="PENDING">Pending</option>
        <option value="COMPLETE">Complete</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>
      <button type="submit" style={buttonStyle}>
        Add Task
      </button>
    </form>
  );
}
