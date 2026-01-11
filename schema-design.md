# Smart Clinic Management System – Schema Design

## Overview
A smart clinic management system must handle both structured and unstructured data. Core operational data such as patients, doctors, appointments, and administrators is highly structured and relational, making MySQL a suitable choice. Flexible data such as prescriptions and doctor notes may vary in structure over time and are better stored in MongoDB. This hybrid approach ensures data integrity, scalability, and adaptability.

---

## MySQL Database Design

Relational data that requires validation, consistency, and relationships is stored in MySQL.

### Table: patients
- patient_id: BIGINT, Primary Key, Auto Increment
- name: VARCHAR(100), NOT NULL
- email: VARCHAR(100), UNIQUE, NOT NULL
- phone: VARCHAR(15), NOT NULL
- password: VARCHAR(255), NOT NULL
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

-- Patients can have many appointments  
-- Email is unique to avoid duplicate accounts  

---

### Table: doctors
- doctor_id: BIGINT, Primary Key, Auto Increment
- name: VARCHAR(100), NOT NULL
- email: VARCHAR(100), UNIQUE, NOT NULL
- specialization: VARCHAR(100), NOT NULL
- phone: VARCHAR(15), NOT NULL
- is_available: BOOLEAN, DEFAULT TRUE

-- Doctors manage availability  
-- Specialization helps patients choose doctors  

---

### Table: admin
- admin_id: BIGINT, Primary Key, Auto Increment
- username: VARCHAR(50), UNIQUE, NOT NULL
- password: VARCHAR(255), NOT NULL
- role: VARCHAR(20), NOT NULL

-- Admins manage system access and configuration  

---

### Table: appointments
- appointment_id: BIGINT, Primary Key, Auto Increment
- doctor_id: BIGINT, Foreign Key → doctors(doctor_id)
- patient_id: BIGINT, Foreign Key → patients(patient_id)
- appointment_time: DATETIME, NOT NULL
- status: INT, NOT NULL  
  -- 0 = Scheduled, 1 = Completed, 2 = Cancelled
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

-- Prevents overlapping appointments at the application layer  
-- Appointment history is retained even if status changes  

---

### Design Considerations
- Appointments should not be deleted if a patient is removed; history is important.
- Doctors should not be allowed overlapping appointments (handled in service logic).
- Validation for email and phone formats will be handled in application code.

---

## MongoDB Collection Design

Some data does not fit well into fixed relational tables. Prescriptions may contain variable medications, notes, and metadata, making MongoDB a better fit.

### Collection: prescriptions

```json
{
  "_id": "ObjectId('64abc123456')",
  "patientId": 101,
  "doctorId": 12,
  "appointmentId": 305,
  "medications": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Twice a day",
      "duration": "5 days"
    },
    {
      "name": "Amoxicillin",
      "dosage": "250mg",
      "frequency": "Once a day",
      "duration": "7 days"
    }
  ],
  "doctorNotes": "Take medicines after meals",
  "tags": ["fever", "infection"],
  "createdAt": "2026-01-10T10:30:00Z"
}
