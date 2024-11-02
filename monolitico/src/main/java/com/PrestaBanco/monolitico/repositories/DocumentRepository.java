package com.PrestaBanco.monolitico.repositories;

import com.PrestaBanco.monolitico.entities.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity, Long> {
    public List<DocumentEntity> findByUserId(Long userId);
}