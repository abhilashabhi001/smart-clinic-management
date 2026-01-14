/* =========================
   Header Component
========================= */

function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  /* --------------------------------
     1. Clear session on homepage
  -------------------------------- */
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = "";
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  /* --------------------------------
     2. Invalid / expired session
  -------------------------------- */
  if (
    (role === "loggedPatient" || role === "admin" || role === "doctor") &&
    !token
  ) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  /* --------------------------------
     3. Build header content
  -------------------------------- */
  let headerContent = `
    <header class="header">
      <div class="logo">
        <img src="/assets/images/logo/logo.png" alt="Clinic Logo" />
      </div>
      <nav class="nav">
  `;

  /* -------- Admin -------- */
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn">Add Doctor</button>
      <a href="#" id="logoutBtn">Logout</a>
    `;
  }

  /* -------- Doctor -------- */
  else if (role === "doctor") {
    headerContent += `
      <a href="/doctor/dashboard">Home</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;
  }

  /* -------- Patient (not logged in) -------- */
  else if (role === "patient" || !role) {
    headerContent += `
      <button id="loginBtn">Login</button>
      <button id="signupBtn">Sign Up</button>
    `;
  }

  /* -------- Logged-in Patient -------- */
  else if (role === "loggedPatient") {
    headerContent += `
      <a href="/pages/patientDashboard.html">Home</a>
      <a href="/pages/patientAppointments.html">Appointments</a>
      <a href="#" id="logoutPatientBtn">Logout</a>
    `;
  }

  headerContent += `
      </nav>
    </header>
  `;

  /* --------------------------------
     4. Inject Header
  -------------------------------- */
  headerDiv.innerHTML = headerContent;

  /* --------------------------------
     5. Attach listeners
  -------------------------------- */
  attachHeaderButtonListeners();
}

/* =========================
   Event Listeners
========================= */
function attachHeaderButtonListeners() {
  const addDocBtn = document.getElementById("addDocBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutPatientBtn = document.getElementById("logoutPatientBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => {
      if (typeof openModal === "function") {
        openModal("addDoctor");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  if (logoutPatientBtn) {
    logoutPatientBtn.addEventListener("click", logoutPatient);
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (typeof openModal === "function") {
        openModal("login");
      }
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      if (typeof openModal === "function") {
        openModal("signup");
      }
    });
  }
}

/* =========================
   Logout Functions
========================= */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

/* =========================
   Auto-render header
========================= */
document.addEventListener("DOMContentLoaded", renderHeader);
