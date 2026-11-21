
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Name Validation
    if (name.length < 3) {
        alert("Name must contain at least 3 characters!");
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }


    // Phone Number Validation
    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10 digit mobile number!");
        return;
    }

    // Subject Validation
    if (subject.length < 3) {
        alert("Subject must contain at least 3 characters!");
        return;
    }

    // Message Validation
    if (message.length < 10) {
        alert("Message must contain at least 10 characters!");
        return;
    }

   
// Show Success Popup

const successPopup = document.getElementById("successPopup");

successPopup.style.display = "flex";

contactForm.reset();
messageCounter.textContent = "0 / 500 characters";
messageCounter.style.color = "#666";

});


/* MESSAGE CHARACTER COUNTER */

const contactMessage = document.getElementById("contactMessage");
const messageCounter = document.getElementById("messageCounter");

contactMessage.addEventListener("input", function() {

    const currentLength = contactMessage.value.length;

    messageCounter.textContent =
        currentLength + " / 500 characters";

    if (currentLength >= 450) {
        messageCounter.style.color = "red";
    } else {
        messageCounter.style.color = "#666";
    }

});

/* CLOSE SUCCESS POPUP */

const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");

if (closePopup && successPopup) {

    closePopup.addEventListener("click", function() {

        successPopup.style.display = "none";

    });

}
