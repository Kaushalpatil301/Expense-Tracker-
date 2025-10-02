package com.expensetracker.dto;

import lombok.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ExpenseDTO {
  private Long id;

  @NotBlank
  private String description;

  @NotNull
  @DecimalMin("0.01")
  private Double amount;

  @NotBlank
  private String category;

  @NotNull
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate date;
}
