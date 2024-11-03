package com.PrestaBanco.monolitico.controllers;

import com.PrestaBanco.monolitico.entities.RequirementsEntity;
import com.PrestaBanco.monolitico.services.RequirementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/requirements")
@CrossOrigin("*")
public class RequirementsController {
    @Autowired
	RequirementsService requirementsService;

    @GetMapping("/")
	public ResponseEntity<List<RequirementsEntity>> listRequirementss() {
    	List<RequirementsEntity> requirements = requirementsService.getRequirementss();
		return ResponseEntity.ok(requirements);
	}

	@GetMapping("/{id}")
	public ResponseEntity<RequirementsEntity> getRequirementsById(@PathVariable Long id) {
		RequirementsEntity requirements = requirementsService.getRequirementsById(id);
		return ResponseEntity.ok(requirements);
	}
	@GetMapping("/loanName/{loanName}")
	public ResponseEntity<List<String>> getRequirementsByLoanName(@PathVariable String loanName) {
		List<String> requirements = requirementsService.getRequirementsByLoanName(loanName);
		return ResponseEntity.ok(requirements);
	}

	@PostMapping("/")
	public ResponseEntity<RequirementsEntity> saveRequirements(@RequestBody RequirementsEntity requirements) {
		RequirementsEntity requirementsNew = requirementsService.saveRequirements(requirements);
		return ResponseEntity.ok(requirementsNew);
	}

	@PutMapping("/")
	public ResponseEntity<RequirementsEntity> updateRequirements(@RequestBody RequirementsEntity requirements){
		RequirementsEntity requirementsUpdated = requirementsService.updateRequirements(requirements);
		return ResponseEntity.ok(requirementsUpdated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteRequirementsById(@PathVariable Long id) throws Exception {
		var isDeleted = requirementsService.deleteRequirements(id);
		return ResponseEntity.noContent().build();
	}
}