package com.PrestaBanco.monolitico.repositories;

import com.PrestaBanco.monolitico.entities.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public UserEntity findByRut(String rut);
    @Query(value = "SELECT * FROM users WHERE users.rut = :rut", nativeQuery = true)
    UserEntity findByRutNativeQuery(@Param("rut") String rut);
    UserEntity findById(long id);
    UserEntity findByEmail(String email); // Método para encontrar usuario por email
}