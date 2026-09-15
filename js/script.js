document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const leaveForm = document.getElementById("leaveForm");
  const complaintForm = document.getElementById("complaintForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const role = document.getElementById("role").value;

      if (role === "student") {
        window.location.href = "student/dashboard.html";
      } else {
        window.location.href = "admin/dashboard.html";
      }
    });
  }

  if (leaveForm) {
    leaveForm.addEventListener("submit", function (event) {
      event.preventDefault();

      alert("Your leave request has been submitted successfully! Status: Pending.");
      leaveForm.reset();
    });
  }

  if (complaintForm) {
    complaintForm.addEventListener("submit", function (event) {
      event.preventDefault();

      alert("Your complaint has been submitted successfully! Status: Pending.");
      complaintForm.reset();
    });
  }
});
