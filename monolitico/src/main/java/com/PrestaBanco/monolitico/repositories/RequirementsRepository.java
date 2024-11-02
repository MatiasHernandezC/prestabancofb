package com.PrestaBanco.monolitico.repositories;

import com.PrestaBanco.monolitico.entities.RequirementsEntity;
import com.PrestaBanco.monolitico.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequirementsRepository extends JpaRepository<RequirementsEntity, Long> {
    public List<RequirementsEntity> findByLoanName(String name);
}