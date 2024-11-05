package com.PrestaBanco.monolitico.services;

import com.PrestaBanco.monolitico.entities.DocumentEntity;
import com.PrestaBanco.monolitico.entities.LoanEntity;
import com.PrestaBanco.monolitico.entities.RequirementsEntity;
import com.PrestaBanco.monolitico.entities.UserEntity;
import com.PrestaBanco.monolitico.repositories.*;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoanService {
    @Autowired
    LoanRepository loanRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RequirementsRepository requirementsRepository;
    @Autowired
    DocumentRepository documentRepository;

    public ArrayList<LoanEntity> getLoans(){
        return (ArrayList<LoanEntity>) loanRepository.findAll();
    }

    public LoanEntity saveLoan(LoanEntity loan){
        return loanRepository.save(loan);
    }

    public LoanEntity getLoanById(Long id){
        return loanRepository.findById(id).get();
    }

    public LoanEntity updateLoan(LoanEntity loan) {
        return loanRepository.save(loan);
    }

    public boolean deleteLoan(Long id) throws Exception {
        try{
            loanRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    public  double simulateLoanFee(String loanName, Integer loanAmount, Integer years, double interest, String userRUT){

        // Comprobar que los datos esten correctos
        int aux = 0;
        int auxRequerimientos = 0;
        UserEntity user = userRepository.findByRut(userRUT);

        if (user == null){
            System.out.println("User not found");
            return 0;
        }
        System.out.println("User found");
        // Comprobar datos
        for(LoanEntity loan : getLoans()){
            // Encontrar tipo de prestamo
            if (loan.getType().equals(loanName)){
                aux +=1;
                List<DocumentEntity> documentos = documentRepository.findByUserId(user.getId());
                List<RequirementsEntity> requerimientos = requirementsRepository.findByLoanName(loanName);
                // Ver si se cumplen los requerimientos
                for (int i=0; i<requerimientos.size(); i++){
                    for (int j=0; j<documentos.size(); j++){
                        if (requerimientos.get(i).getType().equals(documentos.get(j).getType())){
                            auxRequerimientos += 1;
                            j = documentos.size();
                        }
                    }
                }
                if (auxRequerimientos == requerimientos.size()){
                    aux +=1;
                }
                // Que se cumpla el maximo de años
                if (loan.getMaxTerm() >= years){
                    aux +=1;
                }
                // Que se cumpla el rango de interes
                if (loan.getMaxInterest() >= interest && interest >= loan.getMinInterest()){
                    aux +=1;
                }
            }
        }
        // Calcular la cuota mensual
        double fee = 0;
        if (aux == 4){
            double monthlyInterestRate = interest / 12 / 100;
            int totalMonths = years * 12;
            // Calcula el factor compuesto (1 + monthlyInterestRate)^totalMonths
            double pow = Math.pow(1 + monthlyInterestRate, totalMonths);
            // Calcula la cuota mensual
            fee = loanAmount * monthlyInterestRate * pow / (pow - 1);
        }
        return fee;
    }

}