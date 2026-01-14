/* =====================================
   Doctor Dashboard – Appointments
===================================== */

import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

/* -------------------------------------
   Global Variables
-------------------------------------- */
const tableBody = document.getElementById("patientTableBody");

let selectedDate = new Date().toISOString().split("T")[0]; // today's date
let patientName = null;
const token = localStorage.getItem("token");

/* -------------------------------------
   Event Listeners
-------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  bindSearchBar();
  bindFilters();
  loadAppointments();
});

/* -------------------------------------
   Search Bar Logic
-------------------------------------- */
function bindSearchBar() {
  const searchBar = document.getElementById("searchBar");

  if (!searchBar) return;

  searchBar.addEventListener("input", (e) => {
    patientName = e.target.value.trim();
    if (patientName === "") patientName = null;
    loadAppointments();
  });
}

/* -------------------------------------
   Date Filters
-------------------------------------- */
function bindFilters() {
  const todayButton = document.getElementById("todayButton");
  const datePicker = document.getElementById("datePicker");

  if (todayButton) {
    todayButton.addEventListener("click", () => {
      selectedDate = new Date().toISOString().split("T")[0];
      if (datePicker) datePicker.value = selectedDate;
      loadAppointments();
    });
  }

  if (datePicker) {
    datePicker.value = selectedDate;
    datePicker.addEventListener("change", (e) => {
      selectedDate = e.target.value;
      loadAppointments();
    });
  }
}

/* -------------------------------------
   Load Appointments
-------------------------------------- */
async function loadAppointments() {
  tableBody.innerHTML = "";

  try {
    const appointments = await getAllAppointments(
      selectedDate,
      patientName,
      token
    );

    if (!appointments || appointments.length === 0) {
      showMessageRow("No appointments found for the selected date.");
      return;
    }

    appointments.forEach((appointment) => {
      const row = createPatientRow(appointment);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    showMessageRow("Failed to load appointments. Please try again.");
  }
}

/* -------------------------------------
   Utility – Message Row
-------------------------------------- */
function showMessageRow(message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");

  cell.colSpan = 5;
  cell.textContent = message;
  cell.style.textAlign = "center";
  cell.style.fontStyle = "italic";

  row.appendChild(cell);
  tableBody.appendChild(row);
}
