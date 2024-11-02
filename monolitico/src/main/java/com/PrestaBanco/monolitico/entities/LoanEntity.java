package com.PrestaBanco.monolitico.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "loans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)

    // Id
    // Type
    // maxTerm
    // interest
    // requirements

    private Long id;
    private String type;
    private int maxTerm;
    private int maxAmount;
    private Float minInterest;
    private Float maxInterest;
}
