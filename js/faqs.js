document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".faq-list li");

  items.forEach((item) => {
    const q = item.querySelector(".faq-question");
    if (!q) return;

    q.addEventListener("click", () => {
      items.forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
});