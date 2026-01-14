/* =====================================
   Patient Dashboard – Doctors View
===================================== */

import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

/* -------------------------------------
   DOM References
-------------------------------------- */
const contentDiv = document.getElementById("content");

/* -------------------------------------
   Page Load
-------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
  bindAuthButtons();
  bindFilters();
});

/* -------------------------------------
   Load All Doctors
-------------------------------------- */
async function loadDoctorCards() {
  contentDiv.innerHTML = "";

  try {
    const doctors = await getDoctors();

    if (!doctors || doctors.length === 0) {
      contentDiv.innerHTML = "<p>No doctors available.</p>";
      return;
    }

    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error loading doctors:", error);
    contentDiv.innerHTML = "<p>Failed to load doctors.</p>";
  }
}

/* -------------------------------------
   Render Utility
-------------------------------------- */
function renderDoctorCards(doctors) {
  contentDiv.innerHTML = "";
  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

/* -------------------------------------
   Bind Login / Signup Buttons
-------------------------------------- */
function bindAuthButtons() {
  const signupBtn = document.getElementById("patientSignup");
  const loginBtn = document.getElementById("patientLogin");

  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }
}

/* -------------------------------------
   Search & Filter Logic
-------------------------------------- */
function bindFilters() {
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar)
    searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime)
    filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty)
    filterSpecialty.addEventListener("change", filterDoctorsOnChange);
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar")?.value || null;
  const time = document.getElementById("filterTime")?.value || null;
  const specialty =
    document.getElementById("filterSpecialty")?.value || null;

  try {
    const doctors = await filterDoctors(name, time, specialty);

    if (!doctors || doctors.length === 0) {
      contentDiv.innerHTML =
        "<p>No doctors found with the given filters.</p>";
      return;
    }

    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Filter error:", error);
    contentDiv.innerHTML =
      "<p>Error filtering doctors. Please try again.</p>";
  }
}

/* -------------------------------------
   Patient Signup
-------------------------------------- */
window.signupPatient = async function () {
  try {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const phone = document.getElementById("signupPhone").value;
    const address = document.getElementById("signupAddress").value;

    const payload = { name, email, password, phone, address };

    const response = await patientSignup(payload);

    if (response.success) {
      alert(response.message || "Signup successful!");
      window.location.reload();
    } else {
      alert(response.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong during signup.");
  }
};

/* -------------------------------------
   Patient Login
-------------------------------------- */
window.loginPatient = async function () {
  try {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await patientLogin({ email, password });

    if (!response || !response.ok) {
      alert("Invalid credentials!");
      return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", "loggedPatient");

    window.location.href = "../pages/loggedPatientDashboard.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  }
};
