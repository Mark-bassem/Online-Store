fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const favouriteContainer = document.getElementById("favourite-products");
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    if (favourites.length === 0) {
      favouriteContainer.innerHTML = `<p>No favourite items yet.</p>`;
      return;
    }

    function createProductHTML(product) {
      return `
        <div class="product">
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
          </div>
          <div class="icons">
            <span class="btn_add_cart" data-id="${product.id}">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </span>
            <span class="icon_product btn_remove_favourite" data-id="${product.id}">
              <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      `;
    }

    favourites.forEach((favId) => {
      const product = data.find((p) => p.id === favId);
      if (product) {
        favouriteContainer.innerHTML += createProductHTML(product);
      }
    });

    // إزالة منتج من المفضلة
    document.querySelectorAll(".btn_remove_favourite").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        favourites = favourites.filter((fid) => fid !== id);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        location.reload();
      });
    });
  });