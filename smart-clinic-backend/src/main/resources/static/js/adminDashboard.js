/* =====================================
   Admin Dashboard – Doctor Management
===================================== */

import { openModal, closeModal } from "./components/modals.js";
import {
  getDoctors,
  filterDoctors,
  saveDoctor
} from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

/* -------------------------------------
   DOM Ready
-------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
  bindFilters();
  bindAddDoctorButton();
});

/* -------------------------------------
   Load All Doctors
-------------------------------------- */
async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  try {
    const doctors = await getDoctors();

    if (!doctors || doctors.length === 0) {
      contentDiv.innerHTML = "<p>No doctors found.</p>";
      return;
    }

    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error loading doctors:", error);
    contentDiv.innerHTML = "<p>Failed to load doctors.</p>";
  }
}

/* -------------------------------------
   Render Doctor Cards
-------------------------------------- */
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

/* -------------------------------------
   Search & Filter Logic
-------------------------------------- */
function bindFilters() {
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty)
    filterSpecialty.addEventListener("change", filterDoctorsOnChange);
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar")?.value || "";
  const time = document.getElementById("filterTime")?.value || "";
  const specialty =
    document.getElementById("filterSpecialty")?.value || "";

  try {
    const doctors = await filterDoctors(name, time, specialty);

    if (!doctors || doctors.length === 0) {
      document.getElementById("content").innerHTML =
        "<p>No doctors found.</p>";
      return;
    }

    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Filter error:", error);
  }
}

/* -------------------------------------
   Add Doctor Modal
-------------------------------------- */
function bindAddDoctorButton() {
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => {
      openModal("addDoctor");
      bindAddDoctorForm();
    });
  }
}

/* -------------------------------------
   Handle Add Doctor Form
-------------------------------------- */
function bindAddDoctorForm() {
  const form = document.getElementById("addDoctorForm");
  if (!form) return;

  form.addEventListener("submit", adminAddDoctor);
}

async function adminAddDoctor(event) {
  event.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Unauthorized. Please login again.");
    return;
  }

  const name = document.getElementById("docName").value;
  const email = document.getElementById("docEmail").value;
  const password = document.getElementById("docPassword").value;
  const specialty = document.getElementById("docSpecialty").value;
  const mobile = document.getElementById("docMobile").value;

  const availability = [];
  document
    .querySelectorAll("input[name='availability']:checked")
    .forEach((cb) => availability.push(cb.value));

  const doctor = {
    name,
    email,
    password,
    specialty,
    mobile,
    availability
  };

  try {
    const result = await saveDoctor(doctor, token);

    if (result.success) {
      alert("Doctor added successfully!");
      closeModal();
      loadDoctorCards();
    } else {
      alert(result.message || "Failed to add doctor.");
    }
  } catch (error) {
    console.error("Add doctor error:", error);
    alert("Something went wrong while adding doctor.");
  }
}
