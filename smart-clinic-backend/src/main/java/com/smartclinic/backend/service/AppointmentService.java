package com.smartclinic.backend.service;

import com.smartclinic.backend.auth.dto.AppointmentDTO;
import com.smartclinic.backend.models.Appointment;
import com.smartclinic.backend.repo.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<AppointmentDTO> getAppointment(Long doctorId, String patientName) {
        return appointmentRepository.findAll()
                .stream()
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());
    }

    public int bookAppointment(Appointment appointment) {
        appointmentRepository.save(appointment);
        return 1;
    }

    public int updateAppointment(Appointment appointment) {
        appointmentRepository.save(appointment);
        return 1;
    }

    public int cancelAppointment(Long id) {
        appointmentRepository.deleteById(id);
        return 1;
    }
}

