package com.expensetracker.controller;

import com.expensetracker.dto.ExpenseDTO;
import com.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

  private final ExpenseService service;

  @PostMapping
  public ResponseEntity<ExpenseDTO> create(@Valid @RequestBody ExpenseDTO dto) {
    return ResponseEntity.ok(service.create(dto));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ExpenseDTO> update(@PathVariable Long id, @Valid @RequestBody ExpenseDTO dto) {
    return ResponseEntity.ok(service.update(id, dto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ExpenseDTO> get(@PathVariable Long id) {
    return ResponseEntity.ok(service.get(id));
  }

  @GetMapping
  public ResponseEntity<List<ExpenseDTO>> list(
      @RequestParam(required = false) String category,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
      @RequestParam(required = false) String description
  ) {
    return ResponseEntity.ok(service.list(category, startDate, endDate, description));
  }
}
