package com.PrestaBanco.monolitico.services;

import com.PrestaBanco.monolitico.entities.DocumentEntity;
import com.PrestaBanco.monolitico.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentService {
    @Autowired
    DocumentRepository documentRepository;

    public ArrayList<DocumentEntity> getDocuments(){
        return (ArrayList<DocumentEntity>) documentRepository.findAll();
    }

    public DocumentEntity saveDocument(DocumentEntity document){
        return documentRepository.save(document);
    }

    public DocumentEntity getDocumentById(Long id){
        return documentRepository.findById(id).get();
    }
    public List<DocumentEntity> getDocumentByUserId(Long id){
        return documentRepository.findByUserId(id);
    }

    public DocumentEntity updateDocument(DocumentEntity document) {
        return documentRepository.save(document);
    }

    public boolean deleteDocument(Long id) throws Exception {
        try{
            documentRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }
}