package com.PrestaBanco.monolitico.controllers;

import com.PrestaBanco.monolitico.entities.UserEntity;
import com.PrestaBanco.monolitico.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
	UserService userService;

    @GetMapping("/")
	public ResponseEntity<List<UserEntity>> listUsers() {
    	List<UserEntity> users = userService.getUsers();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
		UserEntity user = userService.getUserById(id);
		return ResponseEntity.ok(user);
	}
	@GetMapping("/rut/{rut}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable String rut) {
		UserEntity user = userService.getUserByRut(rut);
		return ResponseEntity.ok(user);
	}
	@PostMapping("/")
	public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user) {
		UserEntity userNew = userService.saveUser(user);
		return ResponseEntity.ok(userNew);
	}

	@PutMapping("/")
	public ResponseEntity<UserEntity> updateUser(@RequestBody UserEntity user){
		UserEntity userUpdated = userService.updateUser(user);
		return ResponseEntity.ok(userUpdated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteUserById(@PathVariable Long id) throws Exception {
		var isDeleted = userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
	@PostMapping("/login")
	public ResponseEntity<UserEntity> login(@RequestBody LoginRequest loginRequest) {
		UserEntity user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
		if (user != null) {
			return ResponseEntity.ok(user); // Devuelve el usuario autenticado
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Credenciales incorrectas
		}
	}
}