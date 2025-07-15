// Register Logic
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const phone = document.getElementById("phone").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const skills = Array.from(document.querySelectorAll('.skill:checked')).map(skill => skill.value);

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!is18(dob)) {
    alert("You must be 18 or older");
    return;
  }

  const user = {
    fullName, email, password, phone, gender, dob, address, city, skills
  };

  localStorage.setItem(email, JSON.stringify(user));
  alert("Registration Successful");
  window.location.href = "login.html";
});

function is18(dob) {
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  const age = new Date(ageDiff).getUTCFullYear() - 1970;
  return age >= 18;
}

// Login Logic
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem(email));

  if (storedUser && storedUser.password === password) {
    localStorage.setItem("currentUser", JSON.stringify(storedUser));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password");
  }
});
