(function () {
  emailjs.init("zoMHGlrTd3na80z8g");
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageEl = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      };

      emailjs
        .send("service_gcmtx96", "template_3pqm4py", formData)
        .then(() => {
          messageEl.textContent =
            "✅ Thank you! Your message has been sent successfully.";
          messageEl.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          messageEl.textContent =
            "❌ Failed to send message. Please try again later.";
          messageEl.style.color = "red";
        });
    });
  }
});