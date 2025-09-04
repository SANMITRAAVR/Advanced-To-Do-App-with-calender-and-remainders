package com.examly.springapp.controller;

import com.examly.springapp.model.Task;
import com.examly.springapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/tasks")
@CrossOrigin(origins = "http://localhost:3000") 
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getTasksForUser(@PathVariable Long userId) {
        List<Task> tasks = taskService.getTasksByUserId(userId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<Task> createTaskForUser(
            @PathVariable Long userId,
            @RequestBody Task task) {
        Task createdTask = taskService.addTaskToUser(userId, task);
        return createdTask != null ? ResponseEntity.ok(createdTask) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTaskForUser(
            @PathVariable Long userId,
            @PathVariable Long taskId,
            @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(userId, taskId, taskDetails);
        return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTaskForUser(
            @PathVariable Long userId,
            @PathVariable Long taskId) {
        boolean deleted = taskService.deleteTask(userId, taskId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
