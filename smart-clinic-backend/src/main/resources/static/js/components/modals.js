/* ===============================
   Modal Component
================================ */

window.openModal = function (type) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.getElementById("closeModal");

  if (!modal || !modalBody) return;

  modal.style.display = "block";

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  if (type === "adminLogin") {
    modalBody.innerHTML = `
      <h2>Admin Login</h2>
      <input type="text" id="adminUsername" placeholder="Username" />
      <input type="password" id="adminPassword" placeholder="Password" />
      <button onclick="adminLoginHandler()">Login</button>
    `;
  }

  if (type === "doctorLogin") {
    modalBody.innerHTML = `
      <h2>Doctor Login</h2>
      <input type="email" id="doctorEmail" placeholder="Email" />
      <input type="password" id="doctorPassword" placeholder="Password" />
      <button onclick="doctorLoginHandler()">Login</button>
    `;
  }
}

/* -------------------------------
   Close modal on outside click
-------------------------------- */
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
