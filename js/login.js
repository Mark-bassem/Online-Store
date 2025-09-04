const loginBtn = document.querySelector(".login-form .btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`✅ Welcome back, ${user.username}!`);
    window.location.href = "index.html";
  } else {
    alert("❌ Wrong email or password.");
  }
});
