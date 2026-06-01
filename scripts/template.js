const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    const closeMenu = () => {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            closeMenu();
        }
    });
}

function scrollHashTargetIntoView() {
    const targetId = window.location.hash.slice(1);

    if (!targetId) {
        return;
    }

    const target = document.getElementById(targetId);

    if (!target) {
        return;
    }

    window.setTimeout(() => {
        target.scrollIntoView({
            block: "start"
        });
    }, 0);
}

window.addEventListener("load", scrollHashTargetIntoView);
window.addEventListener("hashchange", scrollHashTargetIntoView);
