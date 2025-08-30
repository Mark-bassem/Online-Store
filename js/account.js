document.addEventListener("DOMContentLoaded", () => {
  try {
    const raw = localStorage.getItem("currentUser");

    // لو مفيش مستخدم متخزن حول لصفحة تسجيل الدخول
    if (!raw) {
      window.location.href = "login.html";
      return;
    }

    const user = JSON.parse(raw);

    const nameEl = document.getElementById("acc-username");
    const emailEl = document.getElementById("acc-email");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!nameEl || !emailEl || !logoutBtn) {
      console.error(
        "❌ عناصر الصفحة ناقصة: تأكد من IDs: acc-username, acc-email, logoutBtn"
      );
      return;
    }

    nameEl.textContent = user.username || "(No name)";
    emailEl.textContent = user.email || "(No email)";

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      alert("✅ You have logged out successfully.");
      window.location.href = "login.html";
    });
  } catch (err) {
    console.error("❌ Account init error:", err);
  }
});
