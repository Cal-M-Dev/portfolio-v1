document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            feedback.textContent = 'Please fill in all fields.';
            feedback.className = "form-feedback error";
            return;
        }

        const emailPattern = /^\S+@\S+\.\S+$/;
        if (!emailPattern.test(email)) {
            feedback.textContent = 'Please enter a valid email address.';
            feedback.className = "form-feedback error";
            return;
        }

        feedback.textContent = 'Thank you for your message!';
        feedback.className = "form-feedback success";

        form.reset();
    });
});