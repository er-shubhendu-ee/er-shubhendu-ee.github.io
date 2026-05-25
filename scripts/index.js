const roles = [
    "Embedded Systems Developer",
    "Firmware Engineer",
    "BLE Systems Developer",
    "USB Firmware Engineer",
    "Embedded Linux Learner",
    "Power Systems Researcher"
];

const skills = [
    "STM32",
    "ESP32",
    "BLE",
    "BLE Mesh",
    "USB",
    "CDC",
    "HID",
    "UVC",
    "C",
    "C++",
    "Python",
    "UART",
    "I2C",
    "SPI",
    "Modbus",
    "Yocto",
    "Embedded Linux",
    "STM32MP1",
    "Bootloaders",
    "KiCad",
    "Gmsh",
    "Elmer FEM"
];

const typingText = document.getElementById("typingText");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function animateTyping() {
    if (!typingText) {
        return;
    }

    const current = roles[roleIndex];
    typingText.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
        charIndex += 1;
    } else if (!deleting) {
        deleting = true;
        window.setTimeout(animateTyping, 1500);
        return;
    } else if (charIndex > 0) {
        charIndex -= 1;
    } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    window.setTimeout(animateTyping, deleting ? 40 : 90);
}

animateTyping();

const profileCard = document.querySelector(".profile-card");
const typingConsole = document.querySelector(".typing-console");
const heroTitle = document.querySelector(".hero-title");

function syncTypingConsoleHeight() {
    if (!profileCard || !typingConsole) {
        return;
    }

    if (window.innerWidth > 900) {
        typingConsole.style.height = `${profileCard.offsetHeight}px`;
    } else {
        typingConsole.style.removeProperty("height");
    }
}

function fitHeroTitle() {
    if (!heroTitle || !heroTitle.parentElement) {
        return;
    }

    const availableWidth = heroTitle.parentElement.clientWidth;
    const measurementSize = 100;

    heroTitle.style.fontSize = `${measurementSize}px`;

    const titleWidth = heroTitle.scrollWidth;
    const fittedSize = Math.floor(measurementSize * availableWidth / titleWidth);

    heroTitle.style.fontSize = `${Math.max(fittedSize, 14)}px`;
}

function syncHeroLayout() {
    syncTypingConsoleHeight();
    fitHeroTitle();
}

window.addEventListener("load", syncHeroLayout);
window.addEventListener("resize", syncHeroLayout);

const skillsContainer = document.getElementById("skillsContainer");

if (skillsContainer) {
    skills.forEach(skill => {
        const item = document.createElement("div");
        item.className = "skill";
        item.textContent = skill;
        skillsContainer.appendChild(item);
    });
}

const projectCards = document.querySelectorAll(".project-card");

if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    projectCards.forEach(card => {
        card.classList.add("reveal-ready");
        projectObserver.observe(card);
    });
}
