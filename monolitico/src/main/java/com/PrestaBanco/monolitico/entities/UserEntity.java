package com.PrestaBanco.monolitico.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    // Id -
    // Type -
    // email -
    // password -
    // name -
    // RUT -

    private Long id;
    private Integer type;
    private String rut;
    private String name;
    private String email;
    private String password;
}
