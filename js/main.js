let category_nav_list = document.querySelector(".category_nav_list");

function OpenCategoryList() {
  category_nav_list.classList.toggle("active");
}

let nav_links = document.querySelector(".nav_links");

function openMenu() {
  nav_links.classList.toggle("active");
}

var cart = document.querySelector(".cart");

function open_close_cart() {
  cart.classList.toggle("active");
}

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const addToCartButtons = document.querySelectorAll(".btn_add_cart");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        const selectedProduct = data.find((product) => product.id == productId);

        addToCart(selectedProduct);

        const allMatchingButtons = document.querySelectorAll(
          `.btn_add_cart[data-id="${productId}"]`
        );

        allMatchingButtons.forEach((btn) => {
          btn.classList.add("active");
          btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Item in Cart`;
        });
      });
    });

    restoreButtonStates();
  });

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    return;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart_items");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const checkout_items = document.getElementById("checkout_items");

  var total_price = 0;
  var total_count = 0;

  cartItemsContainer.innerHTML = "";
  if (checkout_items) {
    checkout_items.innerHTML = "";
  }

  cart.forEach((item, index) => {
    let total_Price_items = item.price * item.quantity;

    total_price += total_Price_items;

    total_count += item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="item_cart">
          <img src="${item.img}" alt="" />
          <div class="content">
            <h4>${item.name}</h4>
            <p class="price_cart">${total_Price_items}$</p>
            <div class="Quantity_control">
              <button class="decrease_quantity" data-index="${index}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase_quantity" data-index="${index}">+</button>
              <button class="delete_item" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;

    if (checkout_items) {
      checkout_items.innerHTML += `
    <div class="item_cart">
      <div class="image_name">
        <img src="${item.img}" alt="" />

        <div class="content">
          <h4>${item.name}</h4>
          <p class="price_cart">${total_Price_items}$</p>
          <div class="quantity_control">
            <button class="decrease_quantity" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase_quantity" data-index="${index}">+</button>
          </div>
        </div>
      </div>

      <button class="delete_item" data-index="${index}">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    `;
    }
  });

  const price_cart_total = document.querySelector(".price_cart_total");

  const count_item_cart = document.querySelector(".Count_item_cart");

  const count_item_header = document.querySelector(".count-item-header");

  price_cart_total.innerHTML = `${total_price}$`;

  count_item_cart.innerHTML = total_count;

  count_item_header.innerHTML = total_count;

  if (checkout_items) {
    const subtotal_checkout = document.querySelector(".subtotal_checkout");
    const total_checkout = document.querySelector(".total_checkout");

    subtotal_checkout.innerHTML = `${total_price}$`;
    total_checkout.innerHTML = `${total_price + 20}$`;
  }

  const increaseButtons = document.querySelectorAll(".increase_quantity");

  const decreaseButtons = document.querySelectorAll(".decrease_quantity");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = event.target.getAttribute("data-index");
      increaseQuantity(itemIndex);
    });
  });

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = event.target.getAttribute("data-index");
      decreaseQuantity(itemIndex);
    });
  });

  const deleteButtons = document.querySelectorAll(".delete_item");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = event.target
        .closest("button")
        .getAttribute("data-index");
      removeFromCart(itemIndex);
    });
  });
}

function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const removeProduct = cart.splice(index, 1)[0];
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();

  updateButtonsState(removeProduct.id);
}

function updateButtonsState(productId) {
  const allMatchingButtons = document.querySelectorAll(
    `.btn_add_cart[data-id="${productId}"]`
  );

  allMatchingButtons.forEach((button) => {
    button.classList.remove("active");
    button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Add to Cart`;
  });
}

function restoreButtonStates() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    const allMatchingButtons = document.querySelectorAll(
      `.btn_add_cart[data-id="${item.id}"]`
    );

    allMatchingButtons.forEach((button) => {
      button.classList.add("active");
      button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Item in Cart`;
    });
  });
}

updateCart();
restoreButtonStates();
