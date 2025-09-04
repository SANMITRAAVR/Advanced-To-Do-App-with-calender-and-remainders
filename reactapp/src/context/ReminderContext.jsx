import React, { createContext, useContext, useState, useEffect } from "react";

const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState(() => {
    
    const stored = localStorage.getItem("reminders");
    return stored ? JSON.parse(stored) : [];
  });


  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (taskId, reminder) => {
    const newReminder = {
      id: Date.now(), 
      taskId,
      ...reminder,
    };
    setReminders((prev) => [...prev, newReminder]);
  };

  const updateReminder = (id, updated) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const getRemindersByTask = (taskId) => {
    return reminders.filter((r) => r.taskId === taskId);
  };

  return (
    <ReminderContext.Provider
      value={{ reminders, addReminder, updateReminder, deleteReminder, getRemindersByTask }}
    >
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminder = () => useContext(ReminderContext);
