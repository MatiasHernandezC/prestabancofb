package com.PrestaBanco.monolitico.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "userLoans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private Long userId;
    private Long loanId;
    private int totalLoan;
    private int fee;
    private int numberOfFees;
}
