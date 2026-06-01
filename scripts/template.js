const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

function applyRouteLinks() {
    if (!window.ROUTES) {
        return;
    }

    document.querySelectorAll("[data-route]").forEach(link => {
        link.href = window.ROUTES.page(link.dataset.route);
    });

    document.querySelectorAll("[data-project-route]").forEach(link => {
        link.href = window.ROUTES.project(link.dataset.projectRoute);
    });

    document.querySelectorAll("[data-work-section-route]").forEach(link => {
        link.href = window.ROUTES.workSection(link.dataset.workSectionRoute);
    });

    document.querySelectorAll("[data-client-route]").forEach(link => {
        link.href = window.ROUTES.client(link.dataset.clientRoute);
    });
}

applyRouteLinks();

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

function createLoopCarousel(track, navButtons, interval = 2800) {
    let timer;
    const carousel = track.closest(".carousel");

    function getStep() {
        const firstCard = track?.firstElementChild;

        if (!firstCard || !track) {
            return 0;
        }

        const trackStyle = window.getComputedStyle(track);
        const trackGap = parseFloat(trackStyle.columnGap) || 0;

        return firstCard.offsetWidth + trackGap;
    }

    function resetTrack() {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        track.offsetHeight;
        track.style.removeProperty("transition");
    }

    function moveForward() {
        const step = getStep();

        if (!track || !step || track.children.length < 2) {
            return;
        }

        track.style.transform = `translateX(-${step}px)`;

        window.setTimeout(() => {
            track.appendChild(track.firstElementChild);
            resetTrack();
        }, 450);
    }

    function move(direction) {
        if (direction < 0) {
            track.prepend(track.lastElementChild);
            resetTrack();
            return;
        }

        moveForward();
    }

    function start() {
        window.clearInterval(timer);
        timer = window.setInterval(moveForward, interval);
    }

    function stop() {
        window.clearInterval(timer);
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            move(Number(button.dataset.carouselDirection));
            start();
        });
    });

    if (carousel) {
        carousel.addEventListener("mouseenter", stop);
        carousel.addEventListener("mouseleave", start);
        carousel.addEventListener("focusin", stop);
        carousel.addEventListener("focusout", start);
    }

    window.addEventListener("load", resetTrack);
    window.addEventListener("resize", resetTrack);
    start();
}

window.createLoopCarousel = createLoopCarousel;
