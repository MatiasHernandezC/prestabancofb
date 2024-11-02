package com.PrestaBanco.monolitico.controllers;

import com.PrestaBanco.monolitico.entities.UserLoanEntity;
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

    @GetMapping("/")
	public ResponseEntity<List<UserLoanEntity>> listUserLoans() {
    	List<UserLoanEntity> userLoans = userLoanService.getUserLoans();
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

	@PutMapping("/")
	public ResponseEntity<UserLoanEntity> updateUserLoan(@RequestBody UserLoanEntity userLoan){
		UserLoanEntity userLoanUpdated = userLoanService.updateUserLoan(userLoan);
		return ResponseEntity.ok(userLoanUpdated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteUserLoanById(@PathVariable Long id) throws Exception {
		var isDeleted = userLoanService.deleteUserLoan(id);
		return ResponseEntity.noContent().build();
	}
}