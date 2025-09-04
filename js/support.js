(function () {
  emailjs.init("nyVP8myE85IxwJLGi");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("supportForm");
  const messageEl = document.getElementById("supportMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      };

      emailjs
        .send("service_080j9pe", "template_k0sb5j4", formData)
        .then(() => {
          messageEl.textContent = "✅ Your message has been sent successfully!";
          messageEl.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          messageEl.textContent =
            "❌ Failed to send message. Please try again.";
          messageEl.style.color = "red";
        });
    });
  }
});