/* My Account and Edit Profile Functionality */

let loggedInUser = JSON.parse(
    localStorage.getItem("styleKartLoggedInUser")
);

if (!loggedInUser) {
    window.location.href = "login.html";
} else {

    const customerName = document.getElementById("customerName");
    const customerEmail = document.getElementById("customerEmail");

    const editProfileBtn = document.getElementById("editProfileBtn");
    const editProfileForm = document.getElementById("editProfileForm");

    const editName = document.getElementById("editName");
    const editEmail = document.getElementById("editEmail");

    const cancelEdit = document.getElementById("cancelEdit");

    // Display Customer Details
    function displayProfile() {
        customerName.textContent = loggedInUser.name;
        customerEmail.textContent = loggedInUser.email;
    }

    displayProfile();


// =========================
// MY ORDERS
// =========================

function displayOrders() {

    const accountOrders = document.getElementById("accountOrders");

    let orders = JSON.parse(
        localStorage.getItem("styleKartOrders")
    ) || [];

    // Show only logged-in user's orders

    const myOrders = orders.filter(function(order) {
        return order.customerEmail === loggedInUser.email;
    });


    // =========================
    // DASHBOARD STATISTICS
    // =========================

    const totalOrders = myOrders.length;

    const pendingOrders = myOrders.filter(function(order) {
        return order.status === "Order Placed";
    }).length;

    const deliveredOrders = myOrders.filter(function(order) {
        return order.status === "Delivered";
    }).length;

    document.getElementById("totalOrders").textContent = totalOrders;

    document.getElementById("pendingOrders").textContent = pendingOrders;

    document.getElementById("deliveredOrders").textContent = deliveredOrders;


    if (myOrders.length === 0) {

        accountOrders.innerHTML = `
            <div class="no-orders">
                <i class="fa-solid fa-box-open"></i>
                <h3>No Orders Yet!</h3>
                <p>You have not placed any orders yet.</p>
                <a href="index.html">Start Shopping</a>
            </div>
        `;

        return;
    }

    accountOrders.innerHTML = "";

    // Display Latest Orders First

    myOrders.reverse().forEach(function(order) {

        const orderCard = document.createElement("div");
        orderCard.className = "account-order-card";

        const orderDate = new Date(order.orderDate);

        const formattedDate = orderDate.toLocaleDateString("en-IN");

        const orderHeading = document.createElement("h3");
        orderHeading.textContent = "Order ID: " + order.orderId;

        const dateText = document.createElement("p");
        dateText.textContent = "Order Date: " + formattedDate;

        const statusText = document.createElement("p");
        statusText.textContent = "Status: " + order.status;

        const itemList = document.createElement("div");
        itemList.className = "account-order-items";

        (order.items || []).forEach(function(item) {

            const itemText = document.createElement("p");

            itemText.textContent =
                item.name + " × " + item.quantity +
                " - ₹" + (
                    Number(item.price) * Number(item.quantity)
                ).toLocaleString("en-IN");

            itemList.appendChild(itemText);

        });

        const totalText = document.createElement("h3");

        totalText.textContent =
            "Total: ₹" + Number(order.totalAmount).toLocaleString("en-IN");

        orderCard.appendChild(orderHeading);
        orderCard.appendChild(dateText);
        orderCard.appendChild(statusText);
        orderCard.appendChild(itemList);
        orderCard.appendChild(totalText);

        accountOrders.appendChild(orderCard);

    });

}

displayOrders();



    // =========================
    // ADDRESS BOOK
    // =========================

    let editingAddressId = null;

    const addressForm = document.getElementById("addressForm");
    const addAddressBtn = document.getElementById("addAddressBtn");
    const cancelAddressBtn = document.getElementById("cancelAddressBtn");
    const savedAddresses = document.getElementById("savedAddresses");
    const saveAddressBtn = document.getElementById("saveAddressBtn");

    // DISPLAY SAVED ADDRESSES

    function displayAddresses() {

        let addresses = JSON.parse(
            localStorage.getItem("styleKartAddresses")
        ) || [];

        const myAddresses = addresses.filter(function(address) {
            return address.userEmail === loggedInUser.email;
        });

        savedAddresses.innerHTML = "";

        if (myAddresses.length === 0) {
            savedAddresses.innerHTML = "<p>No saved addresses yet.</p>";
            return;
        }

        myAddresses.forEach(function(address) {

            const card = document.createElement("div");
            card.className = "saved-address-card";

            const name = document.createElement("h3");
            name.textContent = address.name;

            const mobile = document.createElement("p");
            mobile.textContent = "Mobile: " + address.mobile;

            const addressText = document.createElement("p");
            addressText.textContent = address.address;

            const city = document.createElement("p");
            city.textContent = address.city + " - " + address.pincode;

            const editBtn = document.createElement("button");
            editBtn.type = "button";
            editBtn.textContent = "Edit";

            editBtn.addEventListener("click", function() {

                editingAddressId = address.id;

                document.getElementById("addressName").value = address.name;
                document.getElementById("addressMobile").value = address.mobile;
                document.getElementById("addressText").value = address.address;
                document.getElementById("addressCity").value = address.city;
                document.getElementById("addressPincode").value = address.pincode;

                saveAddressBtn.textContent = "Update Address";
                addressForm.style.display = "block";
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", function() {

                if (confirm("Are you sure you want to delete this address?")) {

                    addresses = addresses.filter(function(item) {
                        return item.id !== address.id;
                    });

                    localStorage.setItem(
                        "styleKartAddresses",
                        JSON.stringify(addresses)
                    );

                    displayAddresses();
                }
            });

            card.appendChild(name);
            card.appendChild(mobile);
            card.appendChild(addressText);
            card.appendChild(city);
            card.appendChild(editBtn);
            card.appendChild(deleteBtn);

            savedAddresses.appendChild(card);
        });
    }

    // ADD NEW ADDRESS BUTTON

    addAddressBtn.addEventListener("click", function() {

        editingAddressId = null;
        addressForm.reset();

        saveAddressBtn.textContent = "Save Address";
        addressForm.style.display = "block";
    });

    // CANCEL BUTTON

    cancelAddressBtn.addEventListener("click", function() {

        addressForm.reset();
        addressForm.style.display = "none";
        editingAddressId = null;

        saveAddressBtn.textContent = "Save Address";
    });

    // SAVE OR UPDATE ADDRESS

    addressForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let addresses = JSON.parse(
            localStorage.getItem("styleKartAddresses")
        ) || [];

        const addressData = {
            id: editingAddressId || ("ADDR" + Date.now()),
            userEmail: loggedInUser.email,
            name: document.getElementById("addressName").value.trim(),
            mobile: document.getElementById("addressMobile").value.trim(),
            address: document.getElementById("addressText").value.trim(),
            city: document.getElementById("addressCity").value.trim(),
            pincode: document.getElementById("addressPincode").value.trim()
        };

        if (editingAddressId) {

            addresses = addresses.map(function(address) {
                return address.id === editingAddressId
                    ? addressData
                    : address;
            });

        } else {

            addresses.push(addressData);
        }

        localStorage.setItem(
            "styleKartAddresses",
            JSON.stringify(addresses)
        );

        addressForm.reset();
        addressForm.style.display = "none";
        editingAddressId = null;

        saveAddressBtn.textContent = "Save Address";

        displayAddresses();

        alert("Address saved successfully!");
    });

    displayAddresses();



    // Open Edit Profile Form
    editProfileBtn.addEventListener("click", function () {

        editName.value = loggedInUser.name;
        editEmail.value = loggedInUser.email;

        editProfileForm.style.display = "block";
        editProfileBtn.style.display = "none";
    });

    // Cancel Editing
    cancelEdit.addEventListener("click", function () {

        editProfileForm.style.display = "none";
        editProfileBtn.style.display = "inline-block";

    });

    // Save Updated Profile
    editProfileForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const newName = editName.value.trim();
        const newEmail = editEmail.value.trim().toLowerCase();

        let users = JSON.parse(
            localStorage.getItem("styleKartUsers")
        ) || [];

        // Check Duplicate Email
        const existingUser = users.find(function (user) {
            return user.email === newEmail &&
                   user.email !== loggedInUser.email;
        });

        if (existingUser) {
            alert("This email is already registered!");
            return;
        }

        // Find Existing User
        const userIndex = users.findIndex(function (user) {
            return user.email === loggedInUser.email;
        });

        if (userIndex === -1) {
            alert("User account not found!");
            return;
        }

        // Update User Details
        users[userIndex].name = newName;
        users[userIndex].email = newEmail;

        localStorage.setItem(
            "styleKartUsers",
            JSON.stringify(users)
        );

        loggedInUser.name = newName;
        loggedInUser.email = newEmail;

        localStorage.setItem(
            "styleKartLoggedInUser",
            JSON.stringify(loggedInUser)
        );

        displayProfile();

        editProfileForm.style.display = "none";
        editProfileBtn.style.display = "inline-block";

        alert("Profile Updated Successfully!");

    });


    // =========================
    // CHANGE PASSWORD
    // =========================

    const changePasswordBtn = document.getElementById("changePasswordBtn");
    const changePasswordForm = document.getElementById("changePasswordForm");

    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const cancelPassword = document.getElementById("cancelPassword");


    // Open Change Password Form
    changePasswordBtn.addEventListener("click", function () {

        changePasswordForm.style.display = "block";
        changePasswordBtn.style.display = "none";

    });


    // Cancel Change Password
    cancelPassword.addEventListener("click", function () {

        changePasswordForm.reset();

        changePasswordForm.style.display = "none";
        changePasswordBtn.style.display = "inline-block";

    });


    // Update Password
    changePasswordForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const current = currentPassword.value;
        const newPass = newPassword.value;
        const confirmPass = confirmPassword.value;

        let users = JSON.parse(
            localStorage.getItem("styleKartUsers")
        ) || [];

        // Find Logged In User
        const userIndex = users.findIndex(function (user) {

            return user.email === loggedInUser.email;

        });

        if (userIndex === -1) {

            alert("User account not found!");
            return;

        }

        // Verify Current Password
        if (users[userIndex].password !== current) {

            alert("Current Password is incorrect!");
            return;

        }

        // Validate New Password
        if (newPass.length < 6) {

            alert("Password must contain at least 6 characters!");
            return;

        }

        // Check Same Password
        if (newPass === current) {

            alert("New password must be different!");
            return;

        }

        // Confirm Password
        if (newPass !== confirmPass) {

            alert("Passwords do not match!");
            return;

        }

        // Update Password
        users[userIndex].password = newPass;

        localStorage.setItem(
            "styleKartUsers",
            JSON.stringify(users)
        );

        loggedInUser.password = newPass;

        localStorage.setItem(
            "styleKartLoggedInUser",
            JSON.stringify(loggedInUser)
        );

        alert("Password Changed Successfully!");

        changePasswordForm.reset();

        changePasswordForm.style.display = "none";
        changePasswordBtn.style.display = "inline-block";

    });

    // Logout
    document.getElementById("accountLogout").addEventListener("click", function () {

        localStorage.removeItem("styleKartLoggedInUser");

        alert("Logged out successfully!");

        window.location.href = "index.html";

    });
}