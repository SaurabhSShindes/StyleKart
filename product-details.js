

/* =========================
   PRODUCT DETAILS DATA
========================= */

const products = {

    // HOME PRODUCTS

    "Casual Cotton Shirt": {
        name: "Casual Cotton Shirt",
        category: "Men's Clothing",
        price: 799,
        image: "images/shirt.jpg"
    },

    "Elegant Summer Dress": {
        name: "Elegant Summer Dress",
        category: "Women's Clothing",
        price: 1199,
        image: "images/Summer Dress.png"
    },

    "Classic White Sneakers": {
        name: "Classic White Sneakers",
        category: "Men's Footwear",
        price: 1499,
        image: "images/Sneakers.jpg"
    },

    "Premium Handbag": {
        name: "Premium Handbag",
        category: "Women's Accessories",
        price: 999,
        image: "images/Handbag.jpg"
    },

    "Premium Casual T-Shirt": {
        name: "Premium Casual T-Shirt",
        category: "Men's Clothing",
        price: 599,
        image: "images/Premium Casual T-Shirt.jpg"
    },

    "Floral Printed Top": {
        name: "Floral Printed Top",
        category: "Women's Clothing",
        price: 899,
        image: "images/Floral Printed Top.jpg"
    },

    "Sporty Running Shoes": {
        name: "Sporty Running Shoes",
        category: "Men's Footwear",
        price: 1299,
        image: "images/Sporty Running Shoes.jpg"
    },

    "Stylish Shoulder Bag": {
        name: "Stylish Shoulder Bag",
        category: "Women's Accessories",
        price: 1099,
        image: "images/Stylish Shoulder Bag.jpg"
    },


    // MEN'S PRODUCTS

    "Men's Casual Cotton Shirt": {
        name: "Men's Casual Cotton Shirt",
        category: "Men's Clothing",
        price: 799,
        image: "images/shirt.jpg"
    },

    "Men's Premium T-Shirt": {
        name: "Men's Premium T-Shirt",
        category: "Men's Clothing",
        price: 599,
        image: "images/Premium T-Shirt.jpg"
    },

    "Men's Classic Blue Jeans": {
        name: "Men's Classic Blue Jeans",
        category: "Men's Clothing",
        price: 1199,
        image: "images/JEANS.jpg"
    },

    "Men's Casual Sneakers": {
        name: "Men's Casual Sneakers",
        category: "Men's Footwear",
        price: 1499,
        image: "images/Casual Sneakers.jpg"
    },

    // Kid'S PRODUCTS

        // BOYS PRODUCTS

    "Boys T-Shirt": {
        name: "Boys T-Shirt",
        category: "Boys Clothing",
        price: 499,
        image: "images/Boys T-Shirt.png"
    },

    "Boys Jeans": {
        name: "Boys Jeans",
        category: "Boys Clothing",
        price: 699,
        image: "images/Boys Jeans.png"
    },

    "Boys Shirt": {
        name: "Boys Shirt",
        category: "Boys Clothing",
        price: 599,
        image: "images/Boys Shirt.png"
    },

    "Boys Sneakers": {
        name: "Boys Sneakers",
        category: "Boys Footwear",
        price: 999,
        image: "images/Boys Sneakers.png"
    },

    // GIRLS PRODUCTS

    "Girls Dress": {
        name: "Girls Dress",
        category: "Girls Clothing",
        price: 799,
        image: "images/Girls Dress.png"
    },

    "Girls Top": {
        name: "Girls Top",
        category: "Girls Clothing",
        price: 499,
        image: "images/Girls Top.png"
    },

    "Girls Skirt": {
        name: "Girls Skirt",
        category: "Girls Clothing",
        price: 599,
        image: "images/Girls Skirt.png"
    },

    "Girls Shoes": {
        name: "Girls Shoes",
        category: "Girls Footwear",
        price: 899,
        image: "images/Girls Shoes.png"
    }

};


/* =========================
   GET PRODUCT FROM URL
========================= */

const params = new URLSearchParams(window.location.search);

const productName = params.get("name");

const product = products[productName];


/* =========================
   DISPLAY PRODUCT DETAILS
========================= */

if (product) {

    document.getElementById("detailName").textContent =
        product.name;

    document.getElementById("detailCategory").textContent =
        product.category;

    document.getElementById("detailPrice").textContent =
        "₹" + product.price.toLocaleString("en-IN");

    document.getElementById("detailImage").src =
        product.image;

    document.getElementById("detailImage").alt =
        product.name;

} else {

    alert("Product not found!");

    window.location.href = "index.html";

}


/* =========================
   QUANTITY FUNCTIONALITY
========================= */

let quantity = 1;

const quantityDisplay = document.getElementById("quantity");

const increaseQty = document.getElementById("increaseQty");

const decreaseQty = document.getElementById("decreaseQty");


if (quantityDisplay && increaseQty && decreaseQty) {

    increaseQty.addEventListener("click", function() {

        quantity++;

        quantityDisplay.textContent = quantity;

    });


    decreaseQty.addEventListener("click", function() {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent = quantity;

        }

    });

}



/* =========================
   DYNAMIC SIZE SELECTION
========================= */

// Check Product Category
const isKidsProduct =
    product &&
    /^(Kids|Boys|Girls)/i.test(product.category);

// Get Size Options
const sizeOptions = document.querySelector(".size-options");

if (sizeOptions) {

    // Different Sizes for Kids and Adults
    const sizes = isKidsProduct
        ? ["2–3 Years", "4–5 Years", "6–7 Years", "8–10 Years"]
        : ["S", "M", "L", "XL"];

    // Display Sizes
    sizeOptions.innerHTML = "";

    sizes.forEach(function(size) {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = size;

        sizeOptions.appendChild(button);

    });

    // Size Selection
    const sizeButtons = sizeOptions.querySelectorAll("button");

    sizeButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            sizeButtons.forEach(function(btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

        });

    });

}



/* =========================
   ADD TO CART
========================= */

const detailAddCart = document.getElementById("detailAddCart");

if (detailAddCart) {

    detailAddCart.addEventListener("click", function() {

        if (!product) return;

        const selectedSize = document.querySelector(
            ".size-options button.selected"
        );

        if (!selectedSize) {

            alert("Please select a size!");

            return;

        }

        let cart = JSON.parse(
            localStorage.getItem("styleKartCart")
        ) || [];

        const existingProduct = cart.find(function(item) {

            return item.name === product.name &&
                   item.size === selectedSize.textContent;

        });

        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({

                name: product.name,

                price: product.price,

                image: product.image,

                size: selectedSize.textContent,

                quantity: quantity

            });

        }

        localStorage.setItem(
            "styleKartCart",
            JSON.stringify(cart)
        );

        alert("Product added to cart successfully!");

        quantity = 1;

        if (quantityDisplay) {
            quantityDisplay.textContent = quantity;
        }

    });

}


/* =========================
   BACK TO PREVIOUS PAGE
========================= */

const urlParams = new URLSearchParams(window.location.search);

const previousPage = urlParams.get("from");

const backButton = document.querySelector(".back-home");

if (backButton) {

    backButton.href = previousPage || "index.html";

}


/* =========================
   PRODUCT IMAGE GALLERY
========================= */

const mainImage = document.getElementById("detailImage");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach(function(thumbnail) {

    thumbnail.addEventListener("click", function() {

        // Change Main Image
        mainImage.src = thumbnail.src;

        // Remove Active Class
        thumbnails.forEach(function(img) {
            img.classList.remove("active");
        });

        // Add Active Class
        thumbnail.classList.add("active");

    });

});
