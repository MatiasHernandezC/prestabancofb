package com.PrestaBanco.monolitico.services;

import com.PrestaBanco.monolitico.entities.RequirementsEntity;
import com.PrestaBanco.monolitico.repositories.RequirementsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RequirementsService {
    @Autowired
    RequirementsRepository requirementsRepository;

    public ArrayList<RequirementsEntity> getRequirementss(){
        return (ArrayList<RequirementsEntity>) requirementsRepository.findAll();
    }

    public RequirementsEntity saveRequirements(RequirementsEntity loan){
        return requirementsRepository.save(loan);
    }

    public RequirementsEntity getRequirementsById(Long id){
        return requirementsRepository.findById(id).get();
    }

    public RequirementsEntity updateRequirements(RequirementsEntity loan) {
        return requirementsRepository.save(loan);
    }

    public ArrayList<RequirementsEntity> getRequirementsByLoanName(String loanName) {
        return (ArrayList<RequirementsEntity>) requirementsRepository.findByLoanName(loanName);
    }

    public boolean deleteRequirements(Long id) throws Exception {
        try{
            requirementsRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

}