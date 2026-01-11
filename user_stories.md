# User Stories – Smart Clinic Management System

This document contains user stories for Admin, Patient, and Doctor roles.  
Each user story follows the provided template and Agile best practices.

---

## Admin User Stories

### User Story 1
**Title:** Admin Login  
_As an admin, I want to log into the portal using my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**
1. Admin can enter valid credentials to log in.
2. Invalid credentials display an error message.
3. Successful login redirects to the admin dashboard.

**Priority:** High  
**Story Points:** 3  

**Notes:**
- Login must be secured using authentication mechanisms.

---

### User Story 2
**Title:** Admin Logout  
_As an admin, I want to log out of the portal, so that system access is protected._

**Acceptance Criteria:**
1. Admin can log out from any page.
2. Session is invalidated after logout.
3. Admin is redirected to the login page.

**Priority:** Medium  
**Story Points:** 2  

**Notes:**
- Logout should clear session data.

---

### User Story 3
**Title:** Add Doctor Profile  
_As an admin, I want to add doctors to the portal, so that they can manage appointments._

**Acceptance Criteria:**
1. Admin can enter doctor details.
2. Doctor profile is saved successfully.
3. Doctor can log in after being added.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Doctor email must be unique.

---

### User Story 4
**Title:** Delete Doctor Profile  
_As an admin, I want to delete a doctor’s profile, so that inactive doctors are removed._

**Acceptance Criteria:**
1. Admin can select a doctor profile.
2. Doctor profile is removed from the system.
3. Deleted doctor can no longer log in.

**Priority:** Medium  
**Story Points:** 3  

**Notes:**
- Existing appointments should be handled safely.

---

### User Story 5
**Title:** Monthly Appointment Report  
_As an admin, I want to run a stored procedure in MySQL to view monthly appointment counts, so that I can track usage statistics._

**Acceptance Criteria:**
1. Stored procedure executes successfully.
2. Monthly appointment data is returned.
3. Results can be reviewed in the database console.

**Priority:** Low  
**Story Points:** 5  

**Notes:**
- Used for reporting and analytics.

---

## Patient User Stories

### User Story 6
**Title:** View Doctors Without Login  
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. Doctor list is visible without authentication.
2. Doctor specialization is displayed.
3. No booking is allowed without login.

**Priority:** Medium  
**Story Points:** 3  

**Notes:**
- Read-only access.

---

### User Story 7
**Title:** Patient Registration  
_As a patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. Patient can register with valid details.
2. Duplicate emails are not allowed.
3. Successful registration redirects to login.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Password must be encrypted.

---

### User Story 8
**Title:** Patient Login  
_As a patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. Patient can log in with valid credentials.
2. Invalid login shows error message.
3. Successful login redirects to dashboard.

**Priority:** High  
**Story Points:** 3  

**Notes:**
- Secure authentication required.

---

### User Story 9
**Title:** Book Appointment  
_As a patient, I want to log in and book an hour-long appointment, so that I can consult with a doctor._

**Acceptance Criteria:**
1. Patient can select a doctor.
2. Appointment duration is one hour.
3. Booking confirmation is displayed.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Doctor availability must be checked.

---

### User Story 10
**Title:** View Upcoming Appointments  
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**
1. Upcoming appointments are listed.
2. Appointment date and time are visible.
3. Only patient’s own appointments are shown.

**Priority:** Medium  
**Story Points:** 3  

**Notes:**
- Past appointments should be separated.

---

## Doctor User Stories

### User Story 11
**Title:** Doctor Login  
_As a doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. Doctor can log in with valid credentials.
2. Login redirects to doctor dashboard.
3. Invalid login shows error.

**Priority:** High  
**Story Points:** 3  

**Notes:**
- Role-based access control required.

---

### User Story 12
**Title:** Doctor Logout  
_As a doctor, I want to log out of the portal, so that my data remains protected._

**Acceptance Criteria:**
1. Doctor can log out successfully.
2. Session is invalidated.
3. Redirected to login page.

**Priority:** Medium  
**Story Points:** 2  

**Notes:**
- Logout available on all pages.

---

### User Story 13
**Title:** View Appointment Calendar  
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. Appointments are displayed by date.
2. Time slots are clearly shown.
3. Only assigned appointments are visible.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Calendar view preferred.

---

### User Story 14
**Title:** Manage Availability  
_As a doctor, I want to mark my unavailability, so that patients see only available slots._

**Acceptance Criteria:**
1. Doctor can block unavailable time slots.
2. Blocked slots cannot be booked.
3. Availability updates in real time.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Prevent overlapping bookings.

---

### User Story 15
**Title:** Update Doctor Profile  
_As a doctor, I want to update my specialization and contact information, so that patients have up-to-date details._

**Acceptance Criteria:**
1. Doctor can edit profile details.
2. Changes are saved successfully.
3. Updated details are visible to patients.

**Priority:** Medium  
**Story Points:** 3  

**Notes:**
- Validation required for contact info.

---

### User Story 16
**Title:** View Patient Details  
_As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**
1. Patient details are visible before appointment.
2. Only relevant patient data is shown.
3. Access is restricted to assigned appointments.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Sensitive data must be protected.
