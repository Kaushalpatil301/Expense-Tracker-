package com.expensetracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Expense {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(nullable = false)
  private String description;

  @NotNull
  @DecimalMin(value = "0.01")
  @Column(nullable = false)
  private Double amount;

  @NotBlank
  @Column(nullable = false)
  private String category;

  @NotNull
  @Column(nullable = false)
  private LocalDate date;
}
