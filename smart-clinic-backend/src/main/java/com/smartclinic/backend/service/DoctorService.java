package com.smartclinic.backend.service;

import com.smartclinic.backend.models.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smartclinic.backend.auth.repository.DoctorRepository;

import java.util.*;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }

    public int saveDoctor(Doctor doctor) {
        if (doctorRepository.findByEmail(doctor.getEmail()).isPresent()) {
            return -1;
        }
        doctorRepository.save(doctor);
        return 1;
    }

    public int updateDoctor(Doctor doctor) {
        if (!doctorRepository.existsById(doctor.getId())) {
            return -1;
        }
        doctorRepository.save(doctor);
        return 1;
    }

    public int deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            return -1;
        }
        doctorRepository.deleteById(id);
        return 1;
    }

    public Map<String, Object> filterDoctor(String name, String time, String specialty) {
        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctorRepository.findAll());
        return response;
    }
}

