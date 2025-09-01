document.addEventListener("DOMContentLoaded", function () {
  const historyContainer = document.getElementById("purchaseHistory");

  let history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

  if (history.length === 0) {
    historyContainer.innerHTML = `<p>No purchase history available.</p>`;
    return;
  }

  history.forEach((order, index) => {
    const orderEl = document.createElement("div");
    orderEl.classList.add("order");

    let itemsHtml = "";
    order.items.forEach((item) => {
      itemsHtml += `
        <div class="order-item">
          <img src="${item.img}" alt="${item.name}" />
          <div class="order-details">
            <h4>${item.name}</h4>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
          </div>
        </div>
      `;
    });

    orderEl.innerHTML = `
      <div class="order-header">
        <h3>Order #${index + 1}</h3>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Total:</strong> $${order.total}</p>
      </div>
      <div class="order-items">
        ${itemsHtml}
      </div>
    `;

    historyContainer.appendChild(orderEl);
  });
});