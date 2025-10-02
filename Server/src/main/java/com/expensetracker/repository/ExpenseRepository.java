package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findByCategory(String category);
  List<Expense> findByDateBetween(LocalDate from, LocalDate to);
  List<Expense> findByDescriptionContainingIgnoreCase(String q);

  @Query("""
    SELECT e FROM Expense e
    WHERE (:category IS NULL OR e.category = :category)
      AND (:from IS NULL OR e.date >= :from)
      AND (:to IS NULL OR e.date <= :to)
      AND (:q IS NULL OR LOWER(e.description) LIKE LOWER(CONCAT('%', :q, '%')))
  """)
  List<Expense> findByFilters(String category, LocalDate from, LocalDate to, String q);
}
