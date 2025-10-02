package com.expensetracker.service;

import com.expensetracker.dto.ExpenseDTO;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {
  ExpenseDTO create(ExpenseDTO dto);
  ExpenseDTO update(Long id, ExpenseDTO dto);
  void delete(Long id);
  ExpenseDTO get(Long id);
  List<ExpenseDTO> list(String category, LocalDate from, LocalDate to, String q);
}
