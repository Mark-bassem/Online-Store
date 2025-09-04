document.addEventListener("DOMContentLoaded", () => {
  const settings = {
    counterSpeed: 200,
    staggerDelay: 200,
  };

  const fadeElements = document.querySelectorAll(".about-card, .team-member");

  const fadeObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          let current = 0;

          const updateCounter = () => {
            const increment = Math.ceil(target / settings.counterSpeed);
            current += increment;

            if (current < target) {
              counter.innerText = current;
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };

          counter.innerText = "0";

          setTimeout(() => {
            updateCounter();
          }, index * settings.staggerDelay);

          obs.unobserve(counter);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
});