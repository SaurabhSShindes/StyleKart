
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("active");

        const isOpen = navbar.classList.contains("active");

        menuBtn.setAttribute("aria-expanded", isOpen);

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });
}


// Shopping Cart Functionality

// let cart = [];

// const cartPanel = document.getElementById("cartPanel");
// const cartToggle = document.getElementById("cartToggle");
// const closeCart = document.getElementById("closeCart");
// const cartItems = document.getElementById("cartItems");
// const cartTotal = document.getElementById("cartTotal");
// const cartCounter = document.querySelector(".cart-count");

// // Open Cart
// cartToggle.addEventListener("click", function(e) {
//     e.preventDefault();
//     cartPanel.classList.add("active");
// });

// // Close Cart
// closeCart.addEventListener("click", function() {
//     cartPanel.classList.remove("active");
// });


/* =========================
   SHOPPING CART FUNCTIONALITY
========================= */

// Load Cart from LocalStorage
let cart = JSON.parse(
    localStorage.getItem("styleKartCart")
) || [];

const cartPanel = document.getElementById("cartPanel");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCounter = document.querySelector(".cart-count");

// Open Cart
if (cartToggle && cartPanel) {
    cartToggle.addEventListener("click", function(e) {
        e.preventDefault();
        cartPanel.classList.add("active");
    });
}

// Close Cart
if (closeCart && cartPanel) {
    closeCart.addEventListener("click", function() {
        cartPanel.classList.remove("active");
    });
}

// Add Product to Cart
// Capture phase handles clicks even when a product card
// has an inline event.stopPropagation().
document.addEventListener("click", function(e) {

    const button = e.target.closest(".add-cart");

    if (!button) return;

    e.preventDefault();
    e.stopPropagation();

    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const image = button.dataset.image;

    const existingProduct = cart.find(function(item) {
        return item.name === name;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();

    alert("Product added to cart successfully!");

}, true);


// Update Cart
function updateCart() {

    let total = 0;
    let totalQuantity = 0;

    if (cartItems) {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <h3>Your Cart is Empty</h3>
                    <p>Looks like you haven't added anything yet.</p>
                </div>
            `;

        }

        cart.forEach(function(item, index) {

            total += item.price * item.quantity;
            totalQuantity += item.quantity;

            const product = document.createElement("div");

            product.className = "cart-item";

            product.innerHTML = `
                <div class="cart-product">

                    <div class="cart-product-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>

                    <div class="cart-product-info">

                        <h4>${item.name}</h4>

                        ${item.size ? `<p>Size: ${item.size}</p>` : ""}

                        <p class="cart-product-price">
                            ₹${item.price}
                        </p>

                        <p>Quantity: ${item.quantity}</p>

                        <div class="quantity-controls">
                            <button class="decrease">−</button>
                            <span>${item.quantity}</span>
                            <button class="increase">+</button>
                        </div>

                        <button class="remove-btn">
                            <i class="fa-regular fa-trash-can"></i>
                            Remove
                        </button>

                    </div>
                </div>
            `;

            product.querySelector(".decrease").addEventListener("click", function() {

                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(index, 1);
                }

                updateCart();

            });

            product.querySelector(".increase").addEventListener("click", function() {

                item.quantity++;
                updateCart();

            });

            product.querySelector(".remove-btn").addEventListener("click", function() {

                cart.splice(index, 1);
                updateCart();

            });

            cartItems.appendChild(product);

        });

    } else {

        cart.forEach(function(item) {
            total += item.price * item.quantity;
            totalQuantity += item.quantity;
        });

    }

    if (cartTotal) {
        cartTotal.textContent = total.toLocaleString("en-IN");
    }

    if (cartCounter) {
        cartCounter.textContent = totalQuantity;
    }

    localStorage.setItem(
        "styleKartCart",
        JSON.stringify(cart)
    );

}

// Initial Cart Update
updateCart();


// Add Product to Cart
// document.querySelectorAll(".add-cart").forEach(function(button) {

//     button.addEventListener("click", function() {

//         const name = button.dataset.name;
//         const price = Number(button.dataset.price);
//         const image = button.dataset.image;

//         const existingProduct = cart.find(
//             item => item.name === name
//         );

//         if (existingProduct) {
//             existingProduct.quantity++;
//         } else {
//             cart.push({
//                 name: name,
//                 price: price,
//                  image: image,
//                 quantity: 1
//             });
//         }

//         updateCart();
//     });

// });

/*document.addEventListener("click", function(e) {

    const button = e.target.closest(".add-cart");

    if (!button) return;

    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const image = button.dataset.image;

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();

});


// Update Cart
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <h3>Your Cart is Empty</h3>
                <p>Looks like you haven't added anything yet.</p>
            </div>
        `;
    }

    cart.forEach(function(item, index) {

        total += item.price * item.quantity;
        totalQuantity += item.quantity;

        const product = document.createElement("div");

        product.className = "cart-item";

        product.innerHTML = `
            <div class="cart-product">

                <div class="cart-product-image">
                     <img src="${item.image}" alt="${item.name}">
                </div>

                <div class="cart-product-info">

                    <h4>${item.name}</h4>

                    <p class="cart-product-price">
                        ₹${item.price}
                    </p>

                    <div class="quantity-controls">
                        <button class="decrease">−</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>

                    <button class="remove-btn">
                        <i class="fa-regular fa-trash-can"></i>
                        Remove
                    </button>

                </div>
            </div>
        `;

        product.querySelector(".decrease").addEventListener("click", function() {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        });

        product.querySelector(".increase").addEventListener("click", function() {
            item.quantity++;
            updateCart();
        });

        product.querySelector(".remove-btn").addEventListener("click", function() {
            cart.splice(index, 1);
            updateCart();
        });

        cartItems.appendChild(product);

    });

    cartTotal.textContent = total.toLocaleString("en-IN");
    cartCounter.textContent = totalQuantity;
    localStorage.setItem("styleKartCart", JSON.stringify(cart));
}

updateCart();*/


/* Search Functionality */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue = searchInput.value.toLowerCase().trim();

        const productSections = document.querySelectorAll(".products-section");

        productSections.forEach(function(section) {

            const products = section.querySelectorAll(".product-card");

            let visibleProducts = 0;

            products.forEach(function(product) {

                const productName = product.innerText.toLowerCase();

                if (productName.includes(searchValue)) {
                    product.style.display = "";
                    visibleProducts++;
                } else {
                    product.style.display = "none";
                }

            });

            let message = section.querySelector(".no-products-message");

            if (visibleProducts === 0) {

                if (!message) {
                    message = document.createElement("p");
                    message.className = "no-products-message";
                    message.textContent = "No products found!";
                    section.querySelector(".products-container")
                           .after(message);
                }

            } else if (message) {
                message.remove();
            }

        });

    });

}

/* Professional User Account Dropdown */

const accountArea = document.getElementById("accountArea");

if (accountArea) {
    const loggedInUser = JSON.parse(
        localStorage.getItem("styleKartLoggedInUser")
    );

    if (loggedInUser) {
        accountArea.innerHTML = `
            <button class="account-btn" id="accountBtn">
                <i class="fa-solid fa-user-circle"></i>
                <span id="accountName"></span>
                <i class="fa-solid fa-chevron-down"></i>
            </button>

            <div class="account-dropdown" id="accountDropdown">
                <div class="account-info">
                    <strong id="dropdownName"></strong>
                    <small id="dropdownEmail"></small>
                </div>

                <hr>

                <a href="account.html">
                    <i class="fa-solid fa-user"></i>
                    My Account
                </a>

                <button id="logoutBtn">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Logout
                </button>
            </div>
        `;

        document.getElementById("accountName").textContent =
            loggedInUser.name;

        document.getElementById("dropdownName").textContent =
            loggedInUser.name;

        document.getElementById("dropdownEmail").textContent =
            loggedInUser.email;

        const accountBtn = document.getElementById("accountBtn");
        const accountDropdown = document.getElementById("accountDropdown");

        accountBtn.addEventListener("click", function () {
            accountDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!accountArea.contains(event.target)) {
                accountDropdown.classList.remove("show");
            }
        });

        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("styleKartLoggedInUser");

            alert("Logged out successfully!");

            window.location.href = "index.html";
        });
    }
}


/* =========================
   PRODUCT DETAILS NAVIGATION
========================= */

window.openProductDetails = function(productName) {

    const currentPage = window.location.pathname.split("/").pop();

    window.location.href =
        "product-details.html?name=" +
        encodeURIComponent(productName) +
        "&from=" +
        encodeURIComponent(currentPage);
};
