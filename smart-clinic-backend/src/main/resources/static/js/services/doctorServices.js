/* ===============================
   Doctor Services
================================ */

import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + "/doctor";

/* -------------------------------
   Get All Doctors
-------------------------------- */
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

/* -------------------------------
   Delete Doctor (Admin)
-------------------------------- */
export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Delete failed" };
    }

    return { success: true, message: "Doctor deleted successfully" };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return { success: false, message: "Server error while deleting doctor" };
  }
}

/* -------------------------------
   Save / Add Doctor (Admin)
-------------------------------- */
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(doctor)
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to add doctor" };
    }

    return { success: true, message: "Doctor added successfully", data };
  } catch (error) {
    console.error("Error saving doctor:", error);
    return { success: false, message: "Server error while adding doctor" };
  }
}

/* -------------------------------
   Filter Doctors
-------------------------------- */
export async function filterDoctors(name = "", time = "", specialty = "") {
  try {
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (time) params.append("time", time);
    if (specialty) params.append("specialty", specialty);

    const response = await fetch(`${DOCTOR_API}/filter?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to filter doctors");
    }

    return await response.json();
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("Unable to filter doctors. Please try again.");
    return [];
  }
}
