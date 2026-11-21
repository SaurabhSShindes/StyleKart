
/* =========================
   CHECKOUT PAGE
========================= */

// GET CART DATA

let cart = JSON.parse(
    localStorage.getItem("styleKartCart")
) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

let total = 0;


// DISPLAY CART ITEMS

if (cart.length === 0) {

    checkoutItems.innerHTML = "<p>Your cart is empty!</p>";

} else {

    checkoutItems.innerHTML = "";

    cart.forEach(function(item) {

        total += Number(item.price) * Number(item.quantity);

        const product = document.createElement("div");

        product.className = "checkout-product";

        product.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>

            <strong>₹${(
                Number(item.price) * Number(item.quantity)
            ).toLocaleString("en-IN")}</strong>
        `;

        checkoutItems.appendChild(product);

    });

}

checkoutTotal.textContent = total.toLocaleString("en-IN");


// =========================
// PLACE ORDER
// =========================

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function(e) {

    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // GET BILLING DETAILS

    const customerName = document.getElementById("billingName").value.trim();
    const customerMobile = document.getElementById("billingMobile").value.trim();
    const customerEmail = document.getElementById("billingEmail").value.trim().toLowerCase();
    const customerAddress = document.getElementById("billingAddress").value.trim();
    const customerCity = document.getElementById("billingCity").value.trim();
    const customerPincode = document.getElementById("billingPincode").value.trim();

    // GET EXISTING ORDERS

    let orders = JSON.parse(
        localStorage.getItem("styleKartOrders")
    ) || [];

    // CREATE NEW ORDER

    const newOrder = {

        orderId: "SK" + Date.now(),

        customerName: customerName,
        customerMobile: customerMobile,
        customerEmail: customerEmail,

        address: customerAddress,
        city: customerCity,
        pincode: customerPincode,

        items: cart.map(function(item) {
            return { ...item };
        }),

        totalAmount: total,

        orderDate: new Date().toISOString(),

        status: "Order Placed"

    };

    // SAVE ORDER

    orders.push(newOrder);

    localStorage.setItem(
        "styleKartOrders",
        JSON.stringify(orders)
    );

    // CLEAR CART

    localStorage.removeItem("styleKartCart");

    alert("Congratulations! Your order has been placed successfully!");

    window.location.href = "success.html";

});
