
/* Login and Register Functionality */

// Switch to Register Form
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

showRegister.addEventListener("click", function(e) {
    e.preventDefault();

    loginForm.style.display = "none";
    registerForm.style.display = "block";
});

showLogin.addEventListener("click", function(e) {
    e.preventDefault();

    registerForm.style.display = "none";
    loginForm.style.display = "block";
});


// Register New User
const registerFormElement =
    document.getElementById("registerFormElement");

registerFormElement.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;

    let users = JSON.parse(localStorage.getItem("styleKartUsers")) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("This email is already registered!");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("styleKartUsers", JSON.stringify(users));

    alert("Registration Successful! Please Login.");

    registerFormElement.reset();

    registerForm.style.display = "none";
    loginForm.style.display = "block";

});


// Login Existing User
const loginFormElement =
    document.getElementById("loginFormElement");

loginFormElement.addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("styleKartUsers")) || [];

    const user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    if (user) {

        localStorage.setItem("styleKartLoggedInUser", JSON.stringify({
            name: user.name,
            email: user.email
        }));

        alert("Login Successful! Welcome " + user.name);

        window.location.href = "index.html";

    } else {

        alert("Invalid Email or Password!");

    }

});



/* =========================
   FORGOT PASSWORD FUNCTIONALITY
========================= */

const forgotPasswordLink = document.getElementById("forgotPasswordLink");

const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const resetPasswordFormElement = document.getElementById("resetPasswordFormElement");

const backToLogin = document.getElementById("backToLogin");


// Open Forgot Password Form
forgotPasswordLink.addEventListener("click", function(e) {

    e.preventDefault();

    loginForm.style.display = "none";
    registerForm.style.display = "none";
    forgotPasswordForm.style.display = "block";

});


// Back to Login
backToLogin.addEventListener("click", function(e) {

    e.preventDefault();

    forgotPasswordForm.style.display = "none";
    loginForm.style.display = "block";

    resetPasswordFormElement.reset();

});


// Reset Password
resetPasswordFormElement.addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("resetEmail").value.trim().toLowerCase();

    const newPass = document.getElementById("resetNewPassword").value;

    const confirmPass = document.getElementById("resetConfirmPassword").value;


    let users = JSON.parse(
        localStorage.getItem("styleKartUsers")
    ) || [];


    // Find Registered User
    const userIndex = users.findIndex(function(user) {

        return user.email === email;

    });


    if (userIndex === -1) {

        alert("Email is not registered!");

        return;

    }


    // Validate Password Length
    if (newPass.length < 6) {

        alert("Password must contain at least 6 characters!");

        return;

    }


    // Confirm Password
    if (newPass !== confirmPass) {

        alert("Passwords do not match!");

        return;

    }


    // Check Old Password
    if (users[userIndex].password === newPass) {

        alert("New password must be different from old password!");

        return;

    }


    // Update Password
    users[userIndex].password = newPass;


    localStorage.setItem(
        "styleKartUsers",
        JSON.stringify(users)
    );


    alert("Password Reset Successfully! Please Login.");


    // Clear Form
    resetPasswordFormElement.reset();


    // Show Login Form
    forgotPasswordForm.style.display = "none";
    loginForm.style.display = "block";

});
