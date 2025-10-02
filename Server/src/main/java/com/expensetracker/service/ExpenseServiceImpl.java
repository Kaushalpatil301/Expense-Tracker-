package com.expensetracker.service;

import com.expensetracker.dto.ExpenseDTO;
import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

  private final ExpenseRepository repo;

  @Override
  public ExpenseDTO create(ExpenseDTO dto) {
    Expense e = toEntity(dto);
    return toDto(repo.save(e));
  }

  @Override
  public ExpenseDTO update(Long id, ExpenseDTO dto) {
    Expense e = repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    e.setDescription(dto.getDescription());
    e.setAmount(dto.getAmount());
    e.setCategory(dto.getCategory());
    e.setDate(dto.getDate());
    return toDto(repo.save(e));
  }

  @Override
  public void delete(Long id) {
    repo.deleteById(id);
  }

  @Override
  @Transactional(readOnly = true)
  public ExpenseDTO get(Long id) {
    return repo.findById(id).map(this::toDto).orElseThrow(() -> new RuntimeException("Not found"));
  }

  @Override
  @Transactional(readOnly = true)
  public List<ExpenseDTO> list(String category, LocalDate from, LocalDate to, String q) {
    String c = (category != null && !"all".equalsIgnoreCase(category)) ? category : null;
    return repo.findByFilters(c, from, to, q).stream().map(this::toDto).collect(Collectors.toList());
  }

  private ExpenseDTO toDto(Expense e) {
    return ExpenseDTO.builder()
        .id(e.getId())
        .description(e.getDescription())
        .amount(e.getAmount())
        .category(e.getCategory())
        .date(e.getDate())
        .build();
  }

  private Expense toEntity(ExpenseDTO d) {
    return Expense.builder()
        .description(d.getDescription())
        .amount(d.getAmount())
        .category(d.getCategory())
        .date(d.getDate())
        .build();
  }
}
