document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const confirmEmailField = document.getElementById('confirm-email');
  
  // Real-time validation for the Name field
  nameField.addEventListener('input', () => {
    if (nameField.value.trim() === '') {
      showError(nameField, 'Please enter your name.');
    } else {
      hideError(nameField);
    }
  });

  // Validation triggered when the form is submitted
  form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission
    validateForm();  
  });

  // Function to validate the entire form
  function validateForm() {
    // Reset error messages
    hideError(nameField);
    hideError(emailField);
    hideError(confirmEmailField);

    if (nameField.value.trim() === '') {
      showError(nameField, 'Please enter your name.');
    }

    if (emailField.value.trim() === '') {
      showError(emailField, 'Please enter your email.');
    }

    if (confirmEmailField.value !== emailField.value) {
      showError(confirmEmailField, 'Emails do not match.');
    }

    if (!document.querySelector('.error')) {
      form.submit();  // Submit the form if all validations pass
    }
  }

  // Function to show error message
  function showError(inputElement, errorMessage) {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');  // Add error styling to the parent form group
    errorElement.textContent = errorMessage;  // Set the error message text
    errorElement.style.display = 'block';  // Show the error message
  }

  // Function to hide error message
  function hideError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');  // Remove error styling from the parent form group
    errorElement.style.display = 'none';  // Hide the error message
  }
});