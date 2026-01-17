package com.smartclinic.backend.controller;

import com.smartclinic.backend.auth.service.JwtService;
import com.smartclinic.backend.models.Doctor;
import com.smartclinic.backend.auth.dto.DoctorLoginRequest;
import com.smartclinic.backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private JwtService service;

    @GetMapping
    public ResponseEntity<?> getDoctors() {
        return ResponseEntity.ok(Map.of("doctors", doctorService.getDoctors()));
    }

    @PostMapping("/{token}")
    public ResponseEntity<?> addDoctor(@RequestBody Doctor doctor, @PathVariable String token) {
        if (!service.validateToken(token)) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        int result = doctorService.saveDoctor(doctor);
        if (result == 1) return ResponseEntity.ok(Map.of("message", "Doctor added to db"));
        if (result == -1) return ResponseEntity.status(409).body(Map.of("message", "Doctor already exists"));

        return ResponseEntity.internalServerError().body(Map.of("message", "Internal error"));
    }

    @PutMapping("/{token}")
    public ResponseEntity<?> updateDoctor(@RequestBody Doctor doctor, @PathVariable String token) {
        if (!service.validateToken(token)) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        int result = doctorService.updateDoctor(doctor);
        if (result == 1) return ResponseEntity.ok(Map.of("message", "Doctor updated"));
        if (result == -1) return ResponseEntity.status(404).body(Map.of("message", "Doctor not found"));

        return ResponseEntity.internalServerError().body(Map.of("message", "Internal error"));
    }

    @DeleteMapping("/{id}/{token}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id, @PathVariable String token) {
        if (!service.validateToken(token)) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        int result = doctorService.deleteDoctor(id);
        if (result == 1) return ResponseEntity.ok(Map.of("message", "Doctor deleted"));
        if (result == -1) return ResponseEntity.status(404).body(Map.of("message", "Doctor not found"));

        return ResponseEntity.internalServerError().body(Map.of("message", "Internal error"));
    }
}
