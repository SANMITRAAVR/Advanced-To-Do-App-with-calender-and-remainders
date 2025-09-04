package com.examly.springapp.service;

import com.examly.springapp.model.Task;
import com.examly.springapp.repository.TaskRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public Task addTaskToUser(Long userId, Task task) {
        return userRepository.findById(userId).map(user -> {
            task.setUser(user);

            if (task.getDeadlineDate() == null) {
                task.setDeadlineDate(LocalDate.now().plusDays(7));
            }

            return taskRepository.save(task);
        }).orElse(null);
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task updateTask(Long userId, Long taskId, Task taskDetails) {
        return taskRepository.findById(taskId).map(task -> {
            if (!task.getUser().getId().equals(userId)) return null;

            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setPriority(taskDetails.getPriority());
            task.setStatus(taskDetails.getStatus());

            if (taskDetails.getDeadlineDate() != null) {
                task.setDeadlineDate(taskDetails.getDeadlineDate());
            }

            return taskRepository.save(task);
        }).orElse(null);
    }

    public boolean deleteTask(Long userId, Long taskId) {
        return taskRepository.findById(taskId).map(task -> {
            if (!task.getUser().getId().equals(userId)) return false;
            taskRepository.delete(task);
            return true;
        }).orElse(false);
    }
}
