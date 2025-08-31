document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let category = params.get("cat");

  const titleEl = document.getElementById("category-title");
  const productsContainer = document.getElementById("category-products");

  if (!category || !productsContainer) return;

  category = category.toLowerCase();

  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      // فلترة المنتجات حسب الفئة (بدون حساسية لحروف كبيرة/صغيرة)
      const filtered = data.filter(
        (p) => p.category && p.category.toLowerCase() === category
      );

      // تحديث العنوان
      if (titleEl) {
        titleEl.textContent =
          category.charAt(0).toUpperCase() + category.slice(1);
      }

      if (filtered.length === 0) {
        productsContainer.innerHTML =
          "<p>No products found in this category.</p>";
        return;
      }

      // عرض المنتجات
      filtered.forEach((product) => {
        const productEl = document.createElement("div");
        productEl.classList.add("product");

        productEl.innerHTML = `
          <div class="img_product">
            <img src="${product.img}" alt="${product.name}">
          </div>
          <h3 class="name_product">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <div class="price">
            <p>$${product.price}</p>
            ${
              product.old_price
                ? `<span class="old_price">$${product.old_price}</span>`
                : ""
            }
          </div>
          <div class="icons">
            <button class="btn_add_cart" data-id="${product.id}">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
          </div>
        `;

        productsContainer.appendChild(productEl);
      });

      // ✅ تفعيل زرار Add to Cart بعد ما يتعمل render للمنتجات
      document.querySelectorAll(".btn_add_cart").forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = event.currentTarget.getAttribute("data-id");
          const product = data.find((p) => p.id == id);

          if (typeof addToCart === "function") {
            addToCart(product);
          }
        });
      });
    })
    .catch((err) => {
      console.error("Error loading products:", err);
      productsContainer.innerHTML =
        "<p>Failed to load products. Please try again later. ⚠️</p>";
    });
});