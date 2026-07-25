const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitButton = form.querySelector('button[type="submit"]');
const formMessage = form.querySelector(".form-message");

function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue === "") {

        showError(nameInput, "Name is required.");

        return false;
    }

    clearError(nameInput);

    return true;
}

function validateEmail() {
    const emailValue = emailInput.value.trim();

    if (emailValue === "") {

    showError(emailInput, "Email is required.");

    return false;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {

    showError(emailInput, "Please enter a valid email.");

    return false;

    }

    clearError(emailInput);

    return true;

}

function validateMessage() {
    const messageValue = messageInput.value.trim();

    if (messageValue === "") {

    showError(messageInput, "Message is required.");

    return false;

    }

    clearError(messageInput);

    return true;
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {

        formMessage.textContent = "";

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

        emailjs.send(
        "service_vvvsb5d",
        "template_8v7utu3",
        {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        }
    )
    .then(() => {

        submitButton.textContent = "Let's Talk →";
        submitButton.disabled = false;

        formMessage.classList.remove("error");
        formMessage.classList.add("success");

        formMessage.textContent = "✅ Message sent successfully!";

        form.reset();

        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);

        setTimeout(() => {
            formMessage.textContent = "";
            formMessage.classList.remove("success");
        }, 3000);

    })
    .catch((error) => {

        console.error(error);

        submitButton.textContent = "Let's Talk →";
        submitButton.disabled = false;

        formMessage.classList.remove("success");
        formMessage.classList.add("error");

        formMessage.textContent =
            "❌ Failed to send message. Please try again.";

    });

        }
});

function showError(input, message) {

    const error = input.nextElementSibling;

    input.classList.add("error");

    input.classList.remove("success");

    error.textContent = message;

    error.classList.add("show");

}

function clearError(input) {

    const error = input.nextElementSibling;

    input.classList.remove("error");

    input.classList.add("success");

    error.textContent = "";

    error.classList.remove("show");

}