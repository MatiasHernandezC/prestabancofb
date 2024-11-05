package com.PrestaBanco.monolitico.services;

import com.PrestaBanco.monolitico.entities.*;
import com.PrestaBanco.monolitico.repositories.*;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserLoanService {
    @Autowired
    UserLoanRepository userLoanRepository;
    @Autowired
    LoanRepository loanRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RequirementsRepository requirementsRepository;
    @Autowired
    DocumentRepository documentRepository;

    public ArrayList<UserLoanEntity> getUserLoans(){
        return (ArrayList<UserLoanEntity>) userLoanRepository.findAll();
    }

    public ArrayList<UserLoanEntity> getUserLoansByUserId(Long userId){
        return (ArrayList<UserLoanEntity>) userLoanRepository.findByUserId(userId);
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
    public UserLoanEntity updateUserLoanStatus(UserLoanEntity userLoan, int status) {
        userLoan.setStatus(status);
        return userLoanRepository.save(userLoan);
    }
    public UserLoanEntity loanPetition(String userRut, String loanName, Integer quota, Integer amount, Integer years, double interest) {

        int aux = 0;
        int auxRequerimientos = 0;
        UserLoanEntity nuevaPeticion = new UserLoanEntity();
        UserEntity userActual = userRepository.findByRut(userRut);
        LoanEntity loanActual = loanRepository.findByType(loanName);
        if (loanActual == null || userActual == null) {
            System.out.println("Loan o User no encontrados.");
            return null;
        }
        if (userActual == null) {
            System.out.println("User not found");
            return nuevaPeticion;
        }
        System.out.println("User found");
        // Comprobar datos
        for (LoanEntity loan : loanRepository.findAll()) {
            // Encontrar tipo de prestamo
            if (loan.getType().equals(loanName)) {
                aux += 1;
                List<DocumentEntity> documentos = documentRepository.findByUserId(userActual.getId());
                List<RequirementsEntity> requerimientos = requirementsRepository.findByLoanName(loanName);
                // Ver si se cumplen los requerimientos
                for (int i = 0; i < requerimientos.size(); i++) {
                    for (int j = 0; j < documentos.size(); j++) {
                        if (requerimientos.get(i).getType().equals(documentos.get(j).getType())) {
                            auxRequerimientos += 1;
                            j = documentos.size();
                        }
                    }
                }
                if (auxRequerimientos == requerimientos.size()) {
                    aux += 1;
                }
                // Que se cumpla el maximo de años
                if (loan.getMaxTerm() >= years) {
                    aux += 1;
                }
                // Que se cumpla el rango de interes
                if (loan.getMaxInterest() >= interest && interest >= loan.getMinInterest()) {
                    aux += 1;
                }
            }
        }
        if (aux == 4) {
            nuevaPeticion.setLoanId(loanActual.getId());
            nuevaPeticion.setUserId(userActual.getId());
            nuevaPeticion.setStatus(0);
            nuevaPeticion.setTotalLoan(amount);
            // Cuota calculada en loanService
            nuevaPeticion.setQuota(quota);
            nuevaPeticion.setNumberOfQuotas(years * 12);
            nuevaPeticion.setFireInsurance(20000);
            double creditInsurance = amount * 0.0003;
            int creditInsuranceInt = (int) creditInsurance;
            nuevaPeticion.setCreditInsurance(creditInsuranceInt);
            double administrationCost = amount * 0.01;
            int administrationCostInt = (int) administrationCost;
            nuevaPeticion.setAdministrationCost(administrationCostInt);
            int totalCost = (nuevaPeticion.getQuota() + creditInsuranceInt + 20000) * nuevaPeticion.getNumberOfQuotas() + administrationCostInt;
            nuevaPeticion.setTotalCost(totalCost);
            return userLoanRepository.save(nuevaPeticion);
        }
        return nuevaPeticion;
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