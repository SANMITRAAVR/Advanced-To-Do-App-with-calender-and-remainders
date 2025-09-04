package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findByTaskId(Long taskId);
}
