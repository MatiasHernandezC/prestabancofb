package com.PrestaBanco.monolitico.services;

import com.PrestaBanco.monolitico.entities.UserLoanEntity;
import com.PrestaBanco.monolitico.repositories.UserLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserLoanService {
    @Autowired
    UserLoanRepository userLoanRepository;

    public ArrayList<UserLoanEntity> getUserLoans(){
        return (ArrayList<UserLoanEntity>) userLoanRepository.findAll();
    }

    public UserLoanEntity saveUserLoan(UserLoanEntity userLoan){
        return userLoanRepository.save(userLoan);
    }

    public UserLoanEntity getUserLoanById(Long id){
        return userLoanRepository.findById(id).get();
    }

    public UserLoanEntity updateUserLoan(UserLoanEntity userLoan) {
        return userLoanRepository.save(userLoan);
    }

    public boolean deleteUserLoan(Long id) throws Exception {
        try{
            userLoanRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }
}