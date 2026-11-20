
// Get cart data from browser storage
let cart = JSON.parse(localStorage.getItem("styleKartCart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

let total = 0;

if (cart.length === 0) {

    checkoutItems.innerHTML = "<p>Your cart is empty!</p>";

} else {

    checkoutItems.innerHTML = "";

    cart.forEach(function(item) {

        total += item.price * item.quantity;

        const product = document.createElement("div");

        product.className = "checkout-product";

        product.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>

            <strong>₹${item.price * item.quantity}</strong>
        `;

        checkoutItems.appendChild(product);

    });

}

checkoutTotal.textContent = total.toLocaleString("en-IN");

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function(e) {

    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Congratulations! Your order has been placed successfully!");

    localStorage.removeItem("styleKartCart");

    window.location.href = "success.html";

});
