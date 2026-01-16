// render.js

window.selectRole = function (role) {
  console.log("Selected role:", role);

  // Normalize role (important)
  const normalizedRole = role.toLowerCase();

  // Store role
  localStorage.setItem("userRole", normalizedRole);

  // Clear any old token
  localStorage.removeItem("token");

  // Decide what to do next
  switch (normalizedRole) {
    case "admin":
      openModal("adminLogin");
      break;

    case "doctor":
      openModal("doctorLogin");
      break;

    case "patient":
      // patient dashboard is static
      window.location.href = "/pages/patientDashboard.html";
      break;

    default:
      console.error("Unknown role:", role);
  }
};
