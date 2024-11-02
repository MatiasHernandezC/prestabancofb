package com.PrestaBanco.monolitico.repositories;

import com.PrestaBanco.monolitico.entities.UserLoanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLoanRepository extends JpaRepository<UserLoanEntity, Long> {

    public List<UserLoanEntity> findByUserId(Long id);

}