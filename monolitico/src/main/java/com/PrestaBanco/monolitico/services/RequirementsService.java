package com.PrestaBanco.monolitico.services;

import com.PrestaBanco.monolitico.entities.RequirementsEntity;
import com.PrestaBanco.monolitico.repositories.RequirementsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RequirementsService {
    @Autowired
    RequirementsRepository loanRepository;

    public ArrayList<RequirementsEntity> getRequirementss(){
        return (ArrayList<RequirementsEntity>) loanRepository.findAll();
    }

    public RequirementsEntity saveRequirements(RequirementsEntity loan){
        return loanRepository.save(loan);
    }

    public RequirementsEntity getRequirementsById(Long id){
        return loanRepository.findById(id).get();
    }

    public RequirementsEntity updateRequirements(RequirementsEntity loan) {
        return loanRepository.save(loan);
    }

    public boolean deleteRequirements(Long id) throws Exception {
        try{
            loanRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

}