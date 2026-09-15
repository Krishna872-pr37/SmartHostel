document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

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
});
