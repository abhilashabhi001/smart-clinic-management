package com.smartclinic.backend.auth.controller;

import com.smartclinic.backend.auth.dto.DoctorLoginRequest;
import com.smartclinic.backend.auth.service.DoctorAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/doctor")
public class DoctorAuthController {

    @Autowired
    private DoctorAuthService doctorAuthService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DoctorLoginRequest request) {

        String token = doctorAuthService.login(
                request.getEmail(),
                request.getPassword()
        );

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        return ResponseEntity.ok(Map.of("token", token));
    }
}
