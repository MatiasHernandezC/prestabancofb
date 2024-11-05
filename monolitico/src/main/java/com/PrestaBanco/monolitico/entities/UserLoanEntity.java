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
    // 0. Aún no Revisada.
    // 1. En Revisión Inicial.
    // 2. Pendiente de Documentación.
    // 3. En Evaluación.
    // 4. Pre-Aprobada.
    // 5. En Aprobación Final.
    // 6. Aprobada.
    // 7. Rechazada.
    // 8. Cancelada por el Cliente.
    // 9. En Desembolso.
    private int status;
    // Monto pedido
    private int totalLoan;
    private int quota;
    private int numberOfQuotas;
    private int fireInsurance;
    private int creditInsurance;
    private int administrationCost;
    // Monto a pagar
    private int totalCost;
}
