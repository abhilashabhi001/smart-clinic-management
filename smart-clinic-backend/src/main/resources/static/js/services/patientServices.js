/* ===============================
   Patient Services
================================ */

import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + "/patient";

/* -------------------------------
   Patient Signup
-------------------------------- */
export async function patientSignup(data) {
  try {
    const response = await fetch(`${PATIENT_API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Signup failed"
      };
    }

    return {
      success: true,
      message: result.message || "Signup successful"
    };
  } catch (error) {
    console.error("Patient signup error:", error);
    return {
      success: false,
      message: "Server error during signup"
    };
  }
}

/* -------------------------------
   Patient Login
-------------------------------- */
export async function patientLogin(data) {
  try {
    // console.log("Patient login payload:", data); // use only during development

    return await fetch(`${PATIENT_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("Patient login error:", error);
    throw error;
  }
}

/* -------------------------------
   Get Logged-in Patient Data
-------------------------------- */
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch patient data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return null;
  }
}

/* -------------------------------
   Get Patient Appointments
-------------------------------- */
export async function getPatientAppointments(id, token, user) {
  try {
    const response = await fetch(
      `${PATIENT_API}/${user}/${id}/appointments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return null;
  }
}

/* -------------------------------
   Filter Appointments
-------------------------------- */
export async function filterAppointments(condition, name, token) {
  try {
    const params = new URLSearchParams();

    if (condition) params.append("condition", condition);
    if (name) params.append("name", name);

    const response = await fetch(
      `${PATIENT_API}/appointments/filter?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to filter appointments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error filtering appointments:", error);
    alert("Unable to filter appointments. Please try again.");
    return [];
  }
}
