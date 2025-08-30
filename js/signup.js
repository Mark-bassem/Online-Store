const signupBtn = document.querySelector(".login-form .btn");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "" || email === "" || password === "") {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("⚠️ Invalid email address.");
    return;
  }

  if (password.length < 6) {
    alert("⚠️ Password must be at least 6 characters.");
    return;
  }

  // حفظ المستخدمين
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // تأكد إن الإيميل مش موجود قبل كده
  if (users.find((u) => u.email === email)) {
    alert("⚠️ This email is already registered.");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert(`✅ Account created successfully, ${username}!`);

  // تحويل لصفحة تسجيل الدخول
  window.location.href = "login.html";
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}