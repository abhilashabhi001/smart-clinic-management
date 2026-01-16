package com.smartclinic.backend.service;

import com.smartclinic.backend.auth.service.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class TokenValidationService {

    @Autowired
    private JwtService jwtService;

    public Map<String, String> validateToken(String token, String role) {
        try {
            if (!jwtService.validateToken(token)) {
                throw new RuntimeException("Invalid token");
            }

            Claims claims = jwtService.extractClaims(token);
            String tokenRole = claims.get("role", String.class);

            if (!role.equalsIgnoreCase(tokenRole)) {
                return Map.of("error", "Invalid role");
            }
            return Map.of(); // valid
        } catch (Exception e) {
            return Map.of("error", "Invalid token");
        }
    }
}
