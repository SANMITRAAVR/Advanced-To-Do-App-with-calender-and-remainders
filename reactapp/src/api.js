import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api", 
  headers: { "Content-Type": "application/json" },
});

export const signup = (user) =>
  api.post("/auth/signup", {
    id: null,
    username: user.username || "", 
    email: user.email,
    password: user.password,
    role: user.role || "USER",
  });

export const login = (credentials) =>
  api.post("/auth/login", {
    id: null,                   
    username: credentials.username || "", 
    email: credentials.email,
    password: credentials.password,
    role: credentials.role || "USER",    
  });

export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

export const getTasks = (userId) => api.get(`/users/${userId}/tasks`);
export const addTask = (userId, task) => api.post(`/users/${userId}/tasks`, task);
export const updateTask = (userId, taskId, task) =>
  api.put(`/users/${userId}/tasks/${taskId}`, task);
export const deleteTask = (userId, taskId) =>
  api.delete(`/users/${userId}/tasks/${taskId}`);

export const getReminders = (taskId) => api.get(`/tasks/${taskId}/reminders`);
export const addReminder = (taskId, reminder) =>
  api.post(`/tasks/${taskId}/reminders`, reminder);
export const updateReminder = (reminderId, reminder) =>
  api.put(`/reminders/${reminderId}`, reminder);
export const deleteReminder = (reminderId) => api.delete(`/reminders/${reminderId}`);
export const getReminderById = (reminderId) => api.get(`/reminders/${reminderId}`);
