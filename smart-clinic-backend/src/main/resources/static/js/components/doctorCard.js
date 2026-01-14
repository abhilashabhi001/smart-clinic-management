/* ===============================
   Doctor Card Component
================================ */

import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";
import { showBookingOverlay } from "./modals.js";

/* -------------------------------
   Create Doctor Card
-------------------------------- */
export function createDoctorCard(doctor) {

  /* Main Card Container */
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  /* Fetch user role */
  const role = localStorage.getItem("userRole");

  /* -------------------------------
     Doctor Info Section
  -------------------------------- */
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialization: ${doctor.specialization}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const availability = document.createElement("p");
  availability.textContent = `Available: ${
    doctor.availability ? doctor.availability.join(", ") : "N/A"
  }`;

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  /* -------------------------------
     Button Container
  -------------------------------- */
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  /* -------------------------------
     Admin Actions
  -------------------------------- */
  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";

    removeBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(
        `Are you sure you want to delete Dr. ${doctor.name}?`
      );
      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("token");
        await deleteDoctor(doctor.id, token);
        card.remove();
        alert("Doctor deleted successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to delete doctor");
      }
    });

    actionsDiv.appendChild(removeBtn);
  }

  /* -------------------------------
     Patient (Not Logged In)
  -------------------------------- */
  else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    bookNow.addEventListener("click", () => {
      alert("Patient needs to login first.");
    });

    actionsDiv.appendChild(bookNow);
  }

  /* -------------------------------
     Logged-in Patient
  -------------------------------- */
  else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    bookNow.addEventListener("click", async (e) => {
      try {
        const token = localStorage.getItem("token");
        const patientData = await getPatientData(token);
        showBookingOverlay(e, doctor, patientData);
      } catch (error) {
        console.error(error);
        alert("Unable to book appointment");
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  /* -------------------------------
     Final Assembly
  -------------------------------- */
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}
