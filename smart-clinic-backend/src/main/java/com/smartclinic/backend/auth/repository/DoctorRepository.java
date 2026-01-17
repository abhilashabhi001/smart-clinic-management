package com.smartclinic.backend.auth.repository;

import com.smartclinic.backend.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // ✔ Find doctor by email (used for login)
    Optional<Doctor> findByEmail(String email);

    // ✔ Partial name search
    @Query("SELECT d FROM Doctor d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Doctor> findByNameLike(@Param("name") String name);

    // ✔ Name + Specialty (case-insensitive)
    @Query("""
        SELECT d FROM Doctor d
        WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))
        AND LOWER(d.specialty) = LOWER(:specialty)
    """)
    List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(
            @Param("name") String name,
            @Param("specialty") String specialty
    );

    // ✔ Specialty only
    List<Doctor> findBySpecialtyIgnoreCase(String specialty);
}
