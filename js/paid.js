document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("checkoutForm");
  const paymentModal = document.getElementById("paymentModal");
  const paymentTitle = document.getElementById("paymentTitle");
  const paymentDetails = document.getElementById("paymentDetails");
  const closeModal = document.querySelector(".close-modal");
  const cardDetails = document.getElementById("cardDetails");

  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "card") {
        cardDetails.style.display = "block";
      } else {
        cardDetails.style.display = "none";
      }
    });
  });

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedPayment = document.querySelector(
      'input[name="payment"]:checked'
    );
    if (!selectedPayment) {
      alert("⚠️ Please select a payment method!");
      return;
    }

    let title = "";
    let details = "";

    switch (selectedPayment.value) {
      case "vodafone":
        title = "Vodafone Cash Payment";
        details = "➡️ Send the payment to this number: 0100-123-4567";
        break;
      case "instapay":
        title = "InstaPay Payment";
        details = "➡️ Transfer via InstaPay to: markstore@instapay";
        break;
      case "cod":
        title = "Cash on Delivery";
        details = "➡️ You will pay when you receive your order.";
        break;
      case "card":
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const cardName = document.getElementById("cardName").value.trim();
        const expiryDate = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(cardNumber.replace(/\s+/g, ""))) {
          alert("⚠️ Please enter a valid 16-digit card number!");
          return;
        }

        if (cardName.length < 3) {
          alert("⚠️ Please enter the cardholder's full name!");
          return;
        }

        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(expiryDate)) {
          alert("⚠️ Please enter a valid expiry date in MM/YY format!");
          return;
        }

        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(cvv)) {
          alert("⚠️ Please enter a valid CVV (3 or 4 digits)!");
          return;
        }

        title = "Credit / Debit Card Payment";
        details = "✅ Your payment details look correct and secure.";
        break;
    }

    paymentTitle.textContent = title;
    paymentDetails.textContent = details;
    paymentModal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    paymentModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === paymentModal) {
      paymentModal.style.display = "none";
    }
  });

  const cardNumberInput = document.getElementById("cardNumber");
  const cardLogo = document.getElementById("cardLogo");

  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(.{4})/g, "$1 ").trim();
      e.target.value = value;

      if (value.startsWith("4")) {
        cardLogo.src = "img/payments/visa.webp";
        cardLogo.style.display = "block";
      } else if (value.startsWith("5")) {
        cardLogo.src = "img/payments/Master-card.png";
        cardLogo.style.display = "block";
      } else {
        cardLogo.style.display = "none";
      }
    });
  }
});