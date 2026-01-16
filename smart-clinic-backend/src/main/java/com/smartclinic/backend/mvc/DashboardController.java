package com.smartclinic.backend.mvc;

import java.util.Map;

import com.smartclinic.backend.service.TokenValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class DashboardController {

    @Autowired
    private TokenValidationService tokenValidationService;

    /**
     * Admin Dashboard View
     */
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {

        Map<String, String> validationResult =
                tokenValidationService.validateToken(token, "admin");

        // If map is empty → token is valid
        if (validationResult.isEmpty()) {
            return "admin/adminDashboard";
        }

        // Invalid token → redirect to login
        return "redirect:/";
    }

    /**
     * Doctor Dashboard View
     */
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {

        Map<String, String> validationResult =
                tokenValidationService.validateToken(token, "doctor");

        // If map is empty → token is valid
        if (validationResult.isEmpty()) {
            return "doctor/doctorDashboard";
        }

        // Invalid token → redirect to login
        return "redirect:/";
    }
}
