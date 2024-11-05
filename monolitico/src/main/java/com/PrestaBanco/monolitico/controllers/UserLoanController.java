package com.PrestaBanco.monolitico.controllers;

import com.PrestaBanco.monolitico.entities.UserLoanEntity;
import com.PrestaBanco.monolitico.services.LoanService;
import com.PrestaBanco.monolitico.services.UserLoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/userLoans")
@CrossOrigin("*")
public class UserLoanController {
    @Autowired
	UserLoanService userLoanService;
	@Autowired
	LoanService loanService;
    @GetMapping("/")
	public ResponseEntity<List<UserLoanEntity>> listUserLoans() {
    	List<UserLoanEntity> userLoans = userLoanService.getUserLoans();
		return ResponseEntity.ok(userLoans);
	}
	@GetMapping("/userId/")
	public ResponseEntity<List<UserLoanEntity>> listUserLoansByUserId(@RequestParam Long userId) {
		List<UserLoanEntity> userLoans = userLoanService.getUserLoansByUserId(userId);
		return ResponseEntity.ok(userLoans);
	}
	@GetMapping("/{id}")
	public ResponseEntity<UserLoanEntity> getUserLoanById(@PathVariable Long id) {
		UserLoanEntity userLoan = userLoanService.getUserLoanById(id);
		return ResponseEntity.ok(userLoan);
	}

	@PostMapping("/")
	public ResponseEntity<UserLoanEntity> saveUserLoan(@RequestBody UserLoanEntity userLoan) {
		UserLoanEntity userLoanNew = userLoanService.saveUserLoan(userLoan);
		return ResponseEntity.ok(userLoanNew);
	}
	@PostMapping("/request/{loanName}/{amount}/{years}/{interest}/{userRut}")
	public ResponseEntity<UserLoanEntity> saveUserLoanRequest(@PathVariable String loanName,
															  @PathVariable int amount,
															  @PathVariable int years,
															  @PathVariable double interest,
															  @PathVariable String userRut) {

		int quota = (int) loanService.simulateLoanFee(loanName, amount, years, interest, userRut);

		UserLoanEntity userLoanNew = userLoanService.loanPetition(userRut, loanName, quota, amount, years, interest);
		return ResponseEntity.ok(userLoanNew);

	}
	@PutMapping("/")
	public ResponseEntity<UserLoanEntity> updateUserLoan(@RequestBody UserLoanEntity userLoan){
		UserLoanEntity userLoanUpdated = userLoanService.updateUserLoan(userLoan);
		return ResponseEntity.ok(userLoanUpdated);
	}
	@PutMapping("/{status}")
	public ResponseEntity<UserLoanEntity> updateUserLoanStatus(@RequestBody UserLoanEntity userLoan, @PathVariable int status){
		UserLoanEntity userLoanUpdated = userLoanService.updateUserLoanStatus(userLoan, status);
		return ResponseEntity.ok(userLoanUpdated);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteUserLoanById(@PathVariable Long id) throws Exception {
		var isDeleted = userLoanService.deleteUserLoan(id);
		return ResponseEntity.noContent().build();
	}
}