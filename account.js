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