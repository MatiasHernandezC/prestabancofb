package com.PrestaBanco.monolitico.controllers;

import com.PrestaBanco.monolitico.entities.LoanEntity;
import com.PrestaBanco.monolitico.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
@CrossOrigin("*")
public class LoanController {
    @Autowired
	LoanService loanService;

    @GetMapping("/")
	public ResponseEntity<List<LoanEntity>> listLoans() {
    	List<LoanEntity> loans = loanService.getLoans();
		return ResponseEntity.ok(loans);
	}
	@GetMapping("/simulate/{loanName}/{loanAmount}/{years}/{interest}/{userRut}")
	public ResponseEntity<Integer> loanSimulator(@PathVariable String loanName,
												 @PathVariable int loanAmount,
												 @PathVariable int years,
												 @PathVariable double interest,
												 @PathVariable String userRut) {

		int monthly = (int) loanService.simulateLoanFee(loanName, loanAmount, years, interest, userRut);
		return ResponseEntity.ok(monthly);
	}

	@GetMapping("/{id}")
	public ResponseEntity<LoanEntity> getLoanById(@PathVariable Long id) {
		LoanEntity loan = loanService.getLoanById(id);
		return ResponseEntity.ok(loan);
	}

	@PostMapping("/")
	public ResponseEntity<LoanEntity> saveLoan(@RequestBody LoanEntity loan) {
		LoanEntity loanNew = loanService.saveLoan(loan);
		return ResponseEntity.ok(loanNew);
	}

	@PutMapping("/")
	public ResponseEntity<LoanEntity> updateLoan(@RequestBody LoanEntity loan){
		LoanEntity loanUpdated = loanService.updateLoan(loan);
		return ResponseEntity.ok(loanUpdated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteLoanById(@PathVariable Long id) throws Exception {
		var isDeleted = loanService.deleteLoan(id);
		return ResponseEntity.noContent().build();
	}
}