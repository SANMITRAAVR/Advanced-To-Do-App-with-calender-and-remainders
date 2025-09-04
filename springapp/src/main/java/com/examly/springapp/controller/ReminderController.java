package com.examly.springapp.controller;

import com.examly.springapp.model.Reminder;
import com.examly.springapp.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") 
public class ReminderController {

    @Autowired
    private ReminderService reminderService;

    
    @PostMapping("/tasks/{taskId}/reminders")
    public ResponseEntity<Reminder> createReminder(
            @PathVariable Long taskId,
            @RequestBody Reminder reminder) {

        Reminder created = reminderService.addReminderToTask(taskId, reminder);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/tasks/{taskId}/reminders")
    public ResponseEntity<List<Reminder>> getReminders(@PathVariable Long taskId) {
        List<Reminder> reminders = reminderService.getRemindersByTaskId(taskId);
        return ResponseEntity.ok(reminders);
    }

    @GetMapping("/reminders/{id}")
    public ResponseEntity<Reminder> getReminder(@PathVariable Long id) {
        Reminder reminder = reminderService.getReminderById(id);
        return ResponseEntity.ok(reminder);
    }

    @PutMapping("/reminders/{id}")
    public ResponseEntity<Reminder> updateReminder(
            @PathVariable Long id,
            @RequestBody Reminder reminder) {

        Reminder updated = reminderService.updateReminder(id, reminder);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/reminders/{id}")
    public ResponseEntity<Void> deleteReminder(@PathVariable Long id) {
        reminderService.deleteReminder(id);
        return ResponseEntity.noContent().build();
    }
}
