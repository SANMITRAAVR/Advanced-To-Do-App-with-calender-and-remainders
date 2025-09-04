// package com.examly.springapp.service;

// import com.examly.springapp.model.Reminder;
// import com.examly.springapp.repository.ReminderRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class ReminderService {

//     @Autowired
//     private ReminderRepository reminderRepository;

//     public Reminder createReminder(Reminder reminder) {
//         return reminderRepository.save(reminder);
//     }

//     public List<Reminder> getAllReminders() {
//         return reminderRepository.findAll();
//     }

//     public Reminder getReminderById(Long id) {
//         return reminderRepository.findById(id).orElse(null);
//     }

//     public Reminder updateReminder(Long id, Reminder updated) {
//         Reminder existing = getReminderById(id);
//         if (existing != null) {
//             existing.setReminderDate(updated.getReminderDate());
//             existing.setStatus(updated.getStatus());
//             return reminderRepository.save(existing);
//         }
//         return null;
//     }

//     public void deleteReminder(Long id) {
//         reminderRepository.deleteById(id);
//     }

//     public Reminder addReminderToTask(Long taskId, Reminder reminder) {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'addReminderToTask'");
//     }

//     public List<Reminder> getRemindersByTaskId(Long taskId) {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'getRemindersByTaskId'");
//     }
// }

package com.examly.springapp.service;

import com.examly.springapp.model.Reminder;
import com.examly.springapp.model.Task;
import com.examly.springapp.repository.ReminderRepository;
import com.examly.springapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private TaskRepository taskRepository;

    public Reminder addReminderToTask(Long taskId, Reminder reminder) {
        return taskRepository.findById(taskId).map(task -> {
            reminder.setTask(task);
            return reminderRepository.save(reminder);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Reminder> getRemindersByTaskId(Long taskId) {
        return reminderRepository.findByTaskId(taskId);
    }

    public Reminder getReminderById(Long reminderId) {
        return reminderRepository.findById(reminderId)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
    }

    public Reminder updateReminder(Long reminderId, Reminder updatedReminder) {
        return reminderRepository.findById(reminderId).map(reminder -> {
            reminder.setReminderDate(updatedReminder.getReminderDate());
            reminder.setStatus(updatedReminder.getStatus());
            reminder.setMessage(updatedReminder.getMessage());
            return reminderRepository.save(reminder);
        }).orElseThrow(() -> new RuntimeException("Reminder not found"));
    }

    public void deleteReminder(Long reminderId) {
        reminderRepository.findById(reminderId).ifPresent(reminderRepository::delete);
    }
}
