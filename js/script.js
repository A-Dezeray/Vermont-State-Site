document.addEventListener('DOMContentLoaded', function () {
    const email = document.getElementById('email');
    const confirmEmail = document.getElementById('confirmEmail');
    const form = document.getElementById('contactForm');

    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'email-validation-message';
    errorMessage.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: -0.75rem; margin-bottom: 1rem; display: none;';

    if (confirmEmail && confirmEmail.parentNode) {
        confirmEmail.parentNode.insertBefore(errorMessage, confirmEmail.nextSibling);
    }

    function checkEmailMatch() {
        if (!email || !confirmEmail) return;

        const emailValue = email.value.trim();
        const confirmEmailValue = confirmEmail.value.trim();

        // Only validate if both fields have values
        if (emailValue && confirmEmailValue) {
            if (emailValue !== confirmEmailValue) {
                confirmEmail.setCustomValidity('Email addresses must match.');
                confirmEmail.classList.add('error');
                confirmEmail.classList.remove('success');
                errorMessage.textContent = 'Email addresses do not match.';
                errorMessage.style.display = 'block';
            } else {
                confirmEmail.setCustomValidity('');
                confirmEmail.classList.remove('error');
                confirmEmail.classList.add('success');
                errorMessage.textContent = 'Email addresses match!';
                errorMessage.style.color = 'var(--primary-green)';
                errorMessage.style.display = 'block';
            }
        } else {
            // Clear validation if fields are empty
            confirmEmail.setCustomValidity('');
            confirmEmail.classList.remove('error', 'success');
            errorMessage.style.display = 'none';
        }
    }

    // Add real-time validation
    if (email) {
        email.addEventListener('input', checkEmailMatch);
        email.addEventListener('blur', checkEmailMatch);
    }

    if (confirmEmail) {
        confirmEmail.addEventListener('input', checkEmailMatch);
        confirmEmail.addEventListener('blur', checkEmailMatch);
    }

    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (form.checkValidity() && email.value === confirmEmail.value) {
                // Success message
                const successDiv = document.createElement('div');
                successDiv.style.cssText = 'background-color: var(--accent-green); color: var(--text-dark); padding: 1.5rem; border-radius: 8px; margin-top: 1rem; text-align: center; font-weight: 500; border: 2px solid var(--primary-green);';
                successDiv.textContent = 'Thank you for your message! We will get back to you soon.';

                form.appendChild(successDiv);

                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    successDiv.remove();
                    confirmEmail.classList.remove('error', 'success');
                    errorMessage.style.display = 'none';
                }, 3000);
            } else {
                checkEmailMatch();
            }
        });
    }
});
