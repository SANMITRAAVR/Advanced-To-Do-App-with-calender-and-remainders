import React, { useState, useEffect } from "react";
import { getTasks, addTask } from "../api";
import { useNavigate } from "react-router-dom";

export default function Home({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getTasks(userId).then((res) => setTasks(res.data));
    }
  }, [userId]);

  const handleAddTask = async () => {
    if (!title || !deadline) return alert("Fill all fields!");
    const task = { title, deadline };
    await addTask(userId, task);
    const updated = await getTasks(userId);
    setTasks(updated.data);
    setTitle("");
    setDeadline("");
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <button onClick={() => navigate("/calendar")}>Go to Calendar</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} - {new Date(t.deadline).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
