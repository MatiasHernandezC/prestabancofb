package com.PrestaBanco.monolitico.controllers;

import com.PrestaBanco.monolitico.entities.DocumentEntity;
import com.PrestaBanco.monolitico.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@CrossOrigin("*")
public class DocumentController {
    @Autowired
	DocumentService documentService;

    @GetMapping("/")
	public ResponseEntity<List<DocumentEntity>> listDocuments() {
    	List<DocumentEntity> documents = documentService.getDocuments();
		return ResponseEntity.ok(documents);
	}

	@GetMapping("/{id}")
	public ResponseEntity<DocumentEntity> getDocumentById(@PathVariable Long id) {
		DocumentEntity document = documentService.getDocumentById(id);
		return ResponseEntity.ok(document);
	}

	@PostMapping("/")
	public ResponseEntity<DocumentEntity> saveDocument(@RequestBody DocumentEntity document) {
		DocumentEntity documentNew = documentService.saveDocument(document);
		return ResponseEntity.ok(documentNew);
	}

	@PutMapping("/")
	public ResponseEntity<DocumentEntity> updateDocument(@RequestBody DocumentEntity document){
		DocumentEntity documentUpdated = documentService.updateDocument(document);
		return ResponseEntity.ok(documentUpdated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteDocumentById(@PathVariable Long id) throws Exception {
		var isDeleted = documentService.deleteDocument(id);
		return ResponseEntity.noContent().build();
	}
}