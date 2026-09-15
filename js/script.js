document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const role = document.getElementById("role").value;

      if (role === "student") {
        alert("Welcome! You selected the Student Portal. The student dashboard will be added next.");
      } else {
        alert("Welcome! You selected the Warden Portal. The warden dashboard will be added next.");
      }
    });
  }
});
