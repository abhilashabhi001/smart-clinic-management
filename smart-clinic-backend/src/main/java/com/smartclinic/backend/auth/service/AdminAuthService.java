package com.smartclinic.backend.auth.service;

import com.smartclinic.backend.models.Admin;
import com.smartclinic.backend.auth.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtService jwtService;

    public String login(String username, String password) {

        Admin admin = adminRepository.findByUsername(username).orElse(null);

        if (admin == null || !admin.getPassword().equals(password)) {
            return null;
        }

        return jwtService.generateToken(username, "admin");
    }
}
