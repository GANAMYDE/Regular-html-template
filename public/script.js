// Attach event listener to the form for validation on submission
document.getElementById("registration-form").addEventListener("submit", validateForm);

// Attach input event listeners to all inputs in the registration form
document.querySelectorAll("#registration-form input").forEach(input => {
    input.addEventListener("input", validateField);
});

// Toggle the navigation menu
const toggleButton = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

toggleButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Close nav menu when clicking outside of it
document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        navMenu.classList.remove("active");
    }
});

// Validate individual fields based on their name attribute
function validateField(event) {
    const field = event.target;
    const fieldName = field.getAttribute("name");

    switch (fieldName) {
        case "name":
            validateName(field);
            break;
        case "email":
            validateEmail(field);
            break;
        case "confirm-email":
            validateConfirmEmail(field);
            break;
    }
}

// Validate the name field
function validateName(field) {
    const error = document.getElementById("name-error");
    if (field.value.trim().length < 3) {
        showError(field, error, "Name must be at least 3 characters long.");
    } else {
        hideError(field, error);
    }
}

// Validate the email field
function validateEmail(field) {
    const error = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(field.value.trim())) {
        showError(field, error, "Please enter a valid email address.");
    } else {
        hideError(field, error);
    }
}

// Validate the confirm email field against the original email field
function validateConfirmEmail(field) {
    const error = document.getElementById("confirm-email-error");
    const email = document.getElementById("email").value.trim();

    if (field.value.trim() !== email) {
        showError(field, error, "Emails do not match. Please re-enter.");
    } else {
        hideError(field, error);
    }
}

// Show error message and style the field as invalid
function showError(field, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    field.classList.add("error");
    field.setAttribute("aria-invalid", "true");
}

// Hide error message and style the field as valid
function hideError(field, errorElement) {
    errorElement.style.display = "none";
    field.classList.remove("error");
    field.setAttribute("aria-invalid", "false");
}

// Validate the entire form on submission
function validateForm(event) {
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const confirmEmail = document.getElementById("confirm-email");

    // Perform full field validation
    validateName(name);
    validateEmail(email);
    validateConfirmEmail(confirmEmail);

    // Check if any fields still have errors
    if (name.classList.contains("error") || email.classList.contains("error") || confirmEmail.classList.contains("error")) {
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
}
