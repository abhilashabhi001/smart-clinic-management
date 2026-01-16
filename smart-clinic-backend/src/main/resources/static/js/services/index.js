const ADMIN_LOGIN_API = "/admin/login";
const DOCTOR_LOGIN_API = "/doctor/login";

/* -------------------------------
   Admin Login
-------------------------------- */
window.adminLoginHandler = async function () {
  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;

  const response = await fetch(ADMIN_LOGIN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    alert("Invalid credentials");
    return;
  }

  const data = await response.json();
  const token = data.token;

  localStorage.setItem("token", token);
  localStorage.setItem("userRole", "admin");

  // 🔥 THIS IS THE KEY
  window.location.href = `/adminDashboard/${token}`;
};

/* -------------------------------
   Doctor Login
-------------------------------- */
window.doctorLoginHandler = async function () {
  const email = document.getElementById("doctorEmail").value;
  const password = document.getElementById("doctorPassword").value;

  const response = await fetch(DOCTOR_LOGIN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    alert("Invalid credentials");
    return;
  }

  const data = await response.json();
  const token = data.token;

  localStorage.setItem("token", token);
  localStorage.setItem("userRole", "doctor");

  window.location.href = `/doctorDashboard/${token}`;
};
