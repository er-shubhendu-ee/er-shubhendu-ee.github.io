document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async event => {
        event.preventDefault();

        status.textContent = "Sending...";
        status.className = "form-status";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                status.textContent =
                    "Thank you. Your message has been sent successfully.";
                status.classList.add("success");
                form.reset();
            } else {
                status.textContent =
                    "Unable to send message. Please try again later.";
                status.classList.add("error");
            }
        } catch (error) {
            status.textContent =
                "Network error. Please try again later.";
            status.classList.add("error");
        }
    });
});