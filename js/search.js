document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.toLowerCase() || "";
  const category = params.get("category")?.toLowerCase() || "all";

  const titleEl = document.getElementById("search-title");
  const resultsContainer = document.getElementById("search-results");

  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      // فلترة المنتجات حسب البحث + الكاتيجوري
      let filtered = data.filter((p) => p.name.toLowerCase().includes(query));

      if (category !== "all") {
        filtered = filtered.filter(
          (p) => p.category && p.category.toLowerCase() === category
        );
      }

      // عنوان الصفحة
      titleEl.textContent = `Results for "${query}" ${
        category !== "all" ? `in ${category}` : ""
      }`;

      if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p>No products found. ❌</p>";
        return;
      }

      // عرض النتائج
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

        resultsContainer.appendChild(productEl);
      });
    });
});