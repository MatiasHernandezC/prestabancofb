package com.PrestaBanco.monolitico.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "requirements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)

    private Long id;
    private String type;
    private String loanName;
}
