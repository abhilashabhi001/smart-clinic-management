package com.smartclinic.backend.controller;

import com.smartclinic.backend.auth.service.JwtService;
import com.smartclinic.backend.models.Prescription;
import com.smartclinic.backend.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private JwtService service;

    @PostMapping("/{token}")
    public ResponseEntity<?> save(@RequestBody Prescription prescription, @PathVariable String token) {
        if (!service.validateToken(token)) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        return prescriptionService.savePrescription(prescription);
    }

    @GetMapping("/{appointmentId}/{token}")
    public ResponseEntity<?> get(
            @PathVariable Long appointmentId,
            @PathVariable String token) {

        if (!service.validateToken(token)) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        return prescriptionService.getPrescription(appointmentId);
    }
}

