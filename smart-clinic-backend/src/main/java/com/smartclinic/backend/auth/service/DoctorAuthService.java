package com.smartclinic.backend.auth.service;

import com.smartclinic.backend.models.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smartclinic.backend.auth.repository.DoctorRepository;

@Service
public class DoctorAuthService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private JwtService jwtService;

    public String login(String email, String password) {

        Doctor doctor = doctorRepository.findByEmail(email).orElse(null);

        if (doctor == null || !doctor.getPassword().equals(password)) {
            return null;
        }

        return jwtService.generateToken(email, "doctor");
    }
}
