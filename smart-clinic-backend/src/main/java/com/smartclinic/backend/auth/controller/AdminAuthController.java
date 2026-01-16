package com.smartclinic.backend.auth.controller;

import com.smartclinic.backend.auth.dto.AdminLoginRequest;
import com.smartclinic.backend.auth.service.AdminAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminAuthController {

    @Autowired
    private AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest request) {

        String token = adminAuthService.login(
                request.getUsername(),
                request.getPassword()
        );

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        return ResponseEntity.ok(Map.of("token", token));
    }
}
