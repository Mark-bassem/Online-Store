// -------- فتح وإغلاق القوائم --------
const category_nav_list = document.querySelector(".category_nav_list");
const nav_links = document.querySelector(".nav_links");
const cartElement = document.querySelector(".cart");

function OpenCategoryList() {
  category_nav_list.classList.toggle("active");
}

function openMenu() {
  nav_links.classList.toggle("active");
}

function open_close_cart() {
  cartElement.classList.toggle("active");
}

// -------- جلب المنتجات من JSON --------
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    // --- صفحة المنتج (product.html) ---
    if (productId) {
      const product = data.find((p) => p.id == productId);

      if (!product) {
        document.getElementById("product-details").innerHTML =
          "<p>Product not found</p>";
      } else {
        // تفاصيل المنتج
        document.getElementById("product-details").innerHTML = `
          <div class="product">
            <div class="img_product">
              <img src="${product.img}" alt="${product.name}">
            </div>
            <h3 class="name_product">
              <a href="product.html?id=${product.id}">${product.name}</a>
            </h3>
            <p class="description_product">${product.description}</p>
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <div class="price">
              <p>$${product.price}</p>
              ${product.old_price ? `<span class="old_price">$${product.old_price}</span>` : ""}
            </div>
            <div class="icons">
              <button class="btn_add_cart" data-id="${product.id}">
                <i class="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </div>
          </div>
        `;
      }
    }

    // --- زرار Add to Cart لكل المنتجات ---
    document.querySelectorAll(".btn_add_cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        const product = data.find((p) => p.id == id);

        addToCart(product);
        updateButtonsState(id, true);
      });
    });

    restoreButtonStates();
  });

// -------- الكارت --------
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.find((item) => item.id === product.id)) {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart_items");
  const checkout_items = document.getElementById("checkout_items");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total_price = 0;
  let total_count = 0;

  cartItemsContainer.innerHTML = "";
  if (checkout_items) checkout_items.innerHTML = "";

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total_price += itemTotal;
    total_count += item.quantity;

    // عنصر في الكارت (القائمة الجانبية)
    cartItemsContainer.innerHTML += `
      <div class="item_cart">
        <a href="product.html?id=${item.id}" class="image_name">
          <img src="${item.img}" alt="${item.name}" />
        </a>
        <div class="content">
          <h4>${item.name}</h4>
          <p class="price_cart">${itemTotal}$</p>
          <div class="Quantity_control">
            <button class="decrease_quantity" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase_quantity" data-index="${index}">+</button>
            <button class="delete_item" aria-label="Delete item" data-index="${index}" type="button">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // عنصر في صفحة الدفع (checkout.html)
    if (checkout_items) {
      checkout_items.innerHTML += `
        <div class="item_cart">
          <div class="image_name">
            <a href="product.html?id=${item.id}">
              <img src="${item.img}" alt="${item.name}" />
            </a>
            <div class="content">
              <h4>${item.name}</h4>
              <p class="price_cart">${itemTotal}$</p>
              <div class="quantity_control">
                <button class="decrease_quantity" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase_quantity" data-index="${index}">+</button>
              </div>
            </div>
          </div>
          <button class="delete_item" aria-label="Delete item" data-index="${index}" type="button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;
    }
  });

  // إجمالي السعر والعدد
  document.querySelector(".price_cart_total").innerHTML = `${total_price}$`;
  document.querySelector(".Count_item_cart").innerHTML = total_count;
  document.querySelector(".count-item-header").innerHTML = total_count;

  if (checkout_items) {
    document.querySelector(".subtotal_checkout").innerHTML = `${total_price}$`;
    document.querySelector(".total_checkout").innerHTML = `${
      total_price + 20
    }$`;
  }

  // تحكم الكمية والحذف
  document
    .querySelectorAll(".increase_quantity")
    .forEach((btn) =>
      btn.addEventListener("click", () => increaseQuantity(btn.dataset.index))
    );

  document
    .querySelectorAll(".decrease_quantity")
    .forEach((btn) =>
      btn.addEventListener("click", () => decreaseQuantity(btn.dataset.index))
    );

  document
    .querySelectorAll(".delete_item")
    .forEach((btn) =>
      btn.addEventListener("click", () => removeFromCart(btn.dataset.index))
    );
}

function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) cart[index].quantity--;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removed = cart.splice(index, 1)[0];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateButtonsState(removed.id, false);
}

// -------- تحديث حالة الأزرار --------
function updateButtonsState(productId, inCart) {
  document
    .querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)
    .forEach((btn) => {
      if (inCart) {
        btn.classList.add("active");
        btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Item in Cart`;
      } else {
        btn.classList.remove("active");
        btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Add to Cart`;
      }
    });
}

function restoreButtonStates() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item) => updateButtonsState(item.id, true));
}

// -------- بداية التشغيل --------
updateCart();
restoreButtonStates();
