fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const swiper_items_sale = document.getElementById("swiper_items_sale");
    const swiper_electronic = document.getElementById("swiper_electronic");
    const swiper_appliances = document.getElementById("swiper_appliances");
    const swiper_mobiles = document.getElementById("swiper_mobiles");

    // دالة لإنشاء عنصر منتج
    function createProductHTML(product, isInCart, isFavourite) {
      const old_price_paragraph = product.old_price
        ? `<p class="old_price">${product.old_price}$</p>`
        : "";

      const percent_disc_div = product.old_price
        ? `<span class="sale_percent">${Math.floor(
            ((product.old_price - product.price) / product.old_price) * 100
          )}%</span>`
        : "";

      return `
    <div class="swiper-slide product">
      ${percent_disc_div}

      <div class="img_product">
        <a href="product.html?id=${product.id}">
          <img src="${product.img}" alt="${product.name}" />
        </a>
      </div>

      <p class="name_product">
        <a href="product.html?id=${product.id}">${product.name}</a>
      </p>

      <div class="price">
        <p><span>${product.price}$</span></p>
        ${old_price_paragraph}
      </div>

      <div class="icons">
        <span class="btn_add_cart ${isInCart ? "active" : ""}" data-id="${
        product.id
      }">
          <i class="fa-solid fa-cart-shopping"></i>
          ${isInCart ? "Item in Cart" : "Add to Cart"}
        </span>
        <span class="icon_product btn_add_favorite ${
          isFavourite ? "active" : ""
        }" data-id="${product.id}">
          <i class="fa-regular fa-heart"></i>
        </span>
      </div>
    </div>
  `;
    }

    // دالة لإضافة المنتجات حسب الشرط
    function renderProducts(filterFn, container) {
      const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      data.forEach((product) => {
        if (filterFn(product)) {
          const isInCart = cart.find((item) => item.id === product.id);
          const isFavourite = favourites.includes(product.id);

          container.innerHTML += createProductHTML(
            product,
            isInCart,
            isFavourite
          );
        }
      });
    }

    // المنتجات اللي عليها خصم
    renderProducts((p) => p.old_price, swiper_items_sale);

    // الإلكترونيات
    renderProducts(
      (p) => p.category === "Electronics & Digital",
      swiper_electronic
    );

    // الأجهزة المنزلية
    renderProducts(
      (p) => p.category === "Television & Monitor",
      swiper_appliances
    );

    // الموبايلات
    renderProducts((p) => p.category === "Phones & Tablet", swiper_mobiles);
  });
