package com.PrestaBanco.monolitico.repositories;

import com.PrestaBanco.monolitico.entities.LoanEntity;
import com.PrestaBanco.monolitico.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {
    public LoanEntity findByType(String name);
}