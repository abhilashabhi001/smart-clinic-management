package com.smartclinic.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class TokenValidationService {

    /**
     * Validates JWT token and role
     * @param token JWT token
     * @param role expected role (admin / doctor)
     * @return empty map if valid, error map if invalid
     */
    public Map<String, String> validateToken(String token, String role) {

        Map<String, String> errorMap = new HashMap<>();

        // 🔹 Basic validation (replace with real JWT logic later)
        if (token == null || token.isBlank()) {
            errorMap.put("error", "Token is missing");
            return errorMap;
        }

        // 🔹 Example role validation placeholder
        if (!role.equals("admin") && !role.equals("doctor")) {
            errorMap.put("error", "Invalid role");
            return errorMap;
        }

        // ✅ Token accepted (LAB MODE)
        return errorMap; // empty map = valid
    }
}
