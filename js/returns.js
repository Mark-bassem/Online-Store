(function () {
  emailjs.init("nyVP8myE85IxwJLGi");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("returnsForm");
  const messageEl = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // جمع البيانات من الفورم
      const formData = {
        name: form.name.value,
        email: form.email.value,
        order: form.order.value,
        product: form.product.value,
        reason: form.reason.value,
        type: form.type.value,
        message: form.message.value,
      };

      // إرسال الطلب عبر EmailJS
      emailjs
        .send("service_080j9pe", "template_fim2opm", formData)
        .then(() => {
          messageEl.textContent = "Your request has been sent successfully! ✅";
          messageEl.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          messageEl.textContent =
            "Failed to send request. Please try again. ❌";
          messageEl.style.color = "red";
        });
    });
  }
});