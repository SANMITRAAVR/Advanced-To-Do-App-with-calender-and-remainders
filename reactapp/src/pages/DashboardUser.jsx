import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext.jsx";
import { getTasks, addTask, deleteTask, updateTask } from "../api"; 

export default function DashboardUser() {
  const { user, logout } = useAuth();
  const userId = user?.id;
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [reminders, setReminders] = useState([]);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [editingReminderId, setEditingReminderId] = useState(null);
  const [editReminderTitle, setEditReminderTitle] = useState("");
  const [editReminderDate, setEditReminderDate] = useState("");
  const [editReminderTaskId, setEditReminderTaskId] = useState("");

  const [newReminderTitle, setNewReminderTitle] = useState("");
  const [newReminderDate, setNewReminderDate] = useState("");
  const [newReminderTaskId, setNewReminderTaskId] = useState("");

  const [filterDate, setFilterDate] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      try {
        const response = await getTasks(userId);
        const fetchedTasks = Array.isArray(response.data) ? response.data : [];
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleTaskAdded = async (newTask) => {
    try {
      await addTask(userId, newTask);
      const response = await getTasks(userId);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(userId, taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      setReminders(reminders.filter((r) => r.taskId !== taskId)); // remove related reminders
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const startEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditDeadline(task.deadline_date);
    setEditPriority(task.priority);
    setEditStatus(task.status);
  };

  const saveEditTask = async (taskId) => {
    try {
      await updateTask(userId, taskId, {
        title: editTitle,
        description: editDesc,
        deadline_date: editDeadline,
        priority: editPriority,
        status: editStatus,
      });
      setTasks(tasks.map((t) =>
        t.id === taskId
          ? { ...t, title: editTitle, description: editDesc, deadline_date: editDeadline, priority: editPriority, status: editStatus }
          : t
      ));
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminderTitle.trim() || !newReminderDate || !newReminderTaskId) {
      alert("Please enter title, date, and select a task.");
      return;
    }

    const newReminder = {
      id: Date.now(), 
      title: newReminderTitle.trim(),
      date: newReminderDate,
      taskId: Number(newReminderTaskId),
    };

    setReminders([...reminders, newReminder]);
    setNewReminderTitle("");
    setNewReminderDate("");
    setNewReminderTaskId("");
  };

  const handleDeleteReminder = (reminderId) => {
    if (!window.confirm("Are you sure you want to delete this reminder?")) return;
    setReminders(reminders.filter((r) => r.id !== reminderId));
  };

  const startEditReminder = (reminder) => {
    setEditingReminderId(reminder.id);
    setEditReminderTitle(reminder.title);
    setEditReminderDate(reminder.date);
    setEditReminderTaskId(reminder.taskId);
  };

  const saveEditReminder = (reminderId) => {
    if (!editReminderTitle.trim() || !editReminderDate || !editReminderTaskId) {
      alert("Please enter title, date, and select a task.");
      return;
    }

    setReminders(reminders.map((r) =>
      r.id === reminderId
        ? { ...r, title: editReminderTitle, date: editReminderDate, taskId: Number(editReminderTaskId) }
        : r
    ));
    setEditingReminderId(null);
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === "PENDING").length;
    const complete = tasks.filter((t) => t.status === "COMPLETE").length;
    const overdue = tasks.filter((t) => t.deadline_date && t.status !== "COMPLETE" && new Date(t.deadline_date) < new Date()).length;
    return { total, pending, complete, overdue };
  }, [tasks]);

  const filteredTasks = tasks.filter((t) => {
    const matchDate = filterDate ? t.deadline_date === filterDate : true;
    const matchPriority = filterPriority ? t.priority === filterPriority : true;
    const matchStatus = filterStatus ? t.status === filterStatus : true;
    return matchDate && matchPriority && matchStatus;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ width: "100%", padding: "1rem 1rem", backgroundColor: "#3D5AFE", color: "#fff", fontSize: "1.2rem", fontWeight: "bold", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", position: "sticky", top: 0, zIndex: 1000, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>User Dashboard</span>
          <button 
      onClick={() => { logout(); navigate("/login"); }} 
      style={{ 
        backgroundColor: "#ff4d4d", 
        color: "#fff", 
        border: "none", 
        padding: "0.5rem 1rem", 
        borderRadius: "8px", 
        cursor: "pointer", 
        fontWeight: "500", 
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)" 
      }}
    >
      Logout
    </button>
        </div>

        <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f5f7ff", minHeight: "100vh" }}>
          <h2 style={{ color: "#3D5AFE", marginBottom: "1.5rem" }}>Hello, {user?.name}</h2>

          {/* Stats */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {[{ label: "Total Tasks", value: stats.total }, { label: "Pending", value: stats.pending }, { label: "Completed", value: stats.complete }, { label: "Overdue", value: stats.overdue }].map((s, idx) => (
              <div key={idx} style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "10px", flex: "1 1 200px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", textAlign: "center", transition: "transform 0.2s" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3D5AFE" }}>{s.value}</div>
                <div style={{ color: "#666", marginTop: "0.5rem" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filter Section */}
          <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} />
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}>
              <option value="">All Priorities</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}>
              <option value="">All Status</option>
              <option value="PENDING">PENDING</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="INCOMPLETE">INCOMPLETE</option>
            </select>
            <button onClick={() => { setFilterDate(""); setFilterPriority(""); setFilterStatus(""); }} style={{ backgroundColor: "#FFA500", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer" }}>Clear Filters</button>
          </div>

          {/* Tasks Section */}
          <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", marginBottom: "2rem" }}>
            <h3 style={{ color: "#3D5AFE", marginBottom: "1rem" }}>Your Tasks</h3>
            <div style={{ marginBottom: "1.5rem" }}>
              <TaskForm userId={userId} onTaskAdded={handleTaskAdded} />
            </div>
            <table border="0" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", minWidth: "600px" }}>
              <thead style={{ backgroundColor: "#3D5AFE", color: "#fff" }}>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length === 0 && <tr><td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>No tasks found</td></tr>}
                {filteredTasks.map((task) => (
                  <tr key={task.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td>{editingTaskId === task.id ? <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /> : task.title}</td>
                    <td>{editingTaskId === task.id ? <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} /> : task.description}</td>
                    <td>{editingTaskId === task.id ? <input type="date" value={editDeadline} onChange={(e) => setEditDeadline(e.target.value)} /> : task.deadline_date}</td>
                    <td>{editingTaskId === task.id ? <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}><option>LOW</option><option>MEDIUM</option><option>HIGH</option></select> : task.priority}</td>
                    <td>{editingTaskId === task.id ? <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}><option>PENDING</option><option>COMPLETE</option><option>INCOMPLETE</option></select> : task.status}</td>
                    <td>
                      {editingTaskId === task.id ? (
                        <>
                          <button onClick={() => saveEditTask(task.id)} style={{ backgroundColor: "#4CAF50", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer", marginRight: "0.3rem" }}>Save</button>
                          <button onClick={() => setEditingTaskId(null)} style={{ backgroundColor: "#aaa", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditTask(task)} style={{ backgroundColor: "#FFA500", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer", marginRight: "0.3rem" }}>Edit</button>
                          <button onClick={() => handleDeleteTask(task.id)} style={{ backgroundColor: "#ff4d4d", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reminders Section */}
          <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
            <h3 style={{ color: "#3D5AFE", marginBottom: "1rem" }}>Your Reminders</h3>

            {/* Inline Add Reminder Form */}
            <form onSubmit={handleAddReminder} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <input type="text" placeholder="Reminder title" value={newReminderTitle} onChange={(e) => setNewReminderTitle(e.target.value)} style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} required />
              <input type="date" value={newReminderDate} onChange={(e) => setNewReminderDate(e.target.value)} style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} required />
              <select value={newReminderTaskId} onChange={(e) => setNewReminderTaskId(e.target.value)} style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} required>
                <option value="">Select Task</option>
                {tasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}
              </select>
              <button type="submit" style={{ backgroundColor: "#4CAF50", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer" }}>Add</button>
            </form>

            <table border="0" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", minWidth: "400px" }}>
              <thead style={{ backgroundColor: "#3D5AFE", color: "#fff" }}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Task</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reminders.length === 0 && <tr><td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>No reminders found</td></tr>}
                {reminders.map((reminder) => {
                  const taskName = tasks.find(t => t.id === reminder.taskId)?.title || "Unknown";
                  return (
                    <tr key={reminder.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td>{editingReminderId === reminder.id ? <input value={editReminderTitle} onChange={(e) => setEditReminderTitle(e.target.value)} /> : reminder.title}</td>
                      <td>{editingReminderId === reminder.id ? <input type="date" value={editReminderDate} onChange={(e) => setEditReminderDate(e.target.value)} /> : reminder.date}</td>
                      <td>{editingReminderId === reminder.id ? (
                        <select value={editReminderTaskId} onChange={(e) => setEditReminderTaskId(e.target.value)}>
                          <option value="">Select Task</option>
                          {tasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}
                        </select>
                      ) : taskName}</td>
                      <td>
                        {editingReminderId === reminder.id ? (
                          <>
                            <button onClick={() => saveEditReminder(reminder.id)} style={{ backgroundColor: "#4CAF50", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer", marginRight: "0.3rem" }}>Save</button>
                            <button onClick={() => setEditingReminderId(null)} style={{ backgroundColor: "#aaa", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEditReminder(reminder)} style={{ backgroundColor: "#FFA500", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer", marginRight: "0.3rem" }}>Edit</button>
                            <button onClick={() => handleDeleteReminder(reminder.id)} style={{ backgroundColor: "#ff4d4d", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <div style={{ marginTop: "auto", textAlign: "center", padding: "1rem", backgroundColor: "#3D5AFE", color: "#fff", borderRadius: "10px" }}>
          © {new Date().getFullYear()} Tasky | Built with ❤️
        </div>
      </div>
    </div>
  );
}
