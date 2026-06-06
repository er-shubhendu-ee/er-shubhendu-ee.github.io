const roles = [
    "System Architecturer",
    "Power Electronics Researcher",
    "Embedded Systems Developer",
    "Firmware Engineer",
    "Wireless Connectivity Developer",
    "Cloud Integrator",
    "Analog Electronics System Designer",
    "Sensor Interface Designer",
    "High-Speed PCB designer",
    "FPGA Programmer"
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
    "STM32MP1",
    "Bootloaders",
    "KiCad"
];

const projects = [
    {
        title: "USB CDC + UVC Firmware",
        meta: "USB device stack",
        route: "usbCdcUvc"
    },
    {
        title: "BLE Streaming Platform",
        meta: "Wireless data pipeline",
        route: "bleStreaming"
    },
    {
        title: "Grid Connected Inverter Research",
        meta: "Power electronics",
        route: "gridInverter"
    },
    {
        title: "MODBUS over RS485",
        meta: "Industrial communication",
        route: "modbusRs485"
    }
];

const typingText = document.getElementById("typingText");
const roleListing = roles.join(", ");
let charIndex = 0;

function animateTyping() {
    if (!typingText) {
        return;
    }

    typingText.textContent = roleListing.slice(0, charIndex);

    if (charIndex < roleListing.length) {
        charIndex += 1;
        window.setTimeout(animateTyping, 55);
        return;
    }

}

animateTyping();

const profileCard = document.querySelector(".profile-card");
const typingConsole = document.querySelector(".typing-console");
const heroTitle = document.querySelector(".hero-title");
const heroTitleRow = document.querySelector(".hero-title-row");
const clientTrack = document.getElementById("clientTrack");
const clientNavButtons = document.querySelectorAll(".client-carousel [data-carousel-direction]");
const projectTrack = document.getElementById("projectTrack");
const projectNavButtons = document.querySelectorAll(".project-carousel [data-carousel-direction]");

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

    const titleButton = heroTitleRow?.querySelector(".primary-button");
    const titleRowStyle = heroTitleRow ? window.getComputedStyle(heroTitleRow) : null;
    const titleRowGap = titleRowStyle ? parseFloat(titleRowStyle.columnGap) || 0 : 0;
    const availableWidth = heroTitle.parentElement.clientWidth - (titleButton?.offsetWidth || 0) - titleRowGap;
    const previousFitSize = heroTitle.style.getPropertyValue("--hero-title-fit-size");

    heroTitle.style.removeProperty("--hero-title-fit-size");

    const titleWidth = heroTitle.scrollWidth;
    const currentSize = parseFloat(window.getComputedStyle(heroTitle).fontSize);
    const fittedSize = Math.floor(currentSize * availableWidth / titleWidth);

    if (titleWidth > availableWidth && availableWidth > 0) {
        heroTitle.style.setProperty("--hero-title-fit-size", `${Math.max(fittedSize, 10)}px`);
    } else if (previousFitSize) {
        heroTitle.style.removeProperty("--hero-title-fit-size");
    }
}

function syncHeroLayout() {
    syncTypingConsoleHeight();
    fitHeroTitle();
}

window.addEventListener("load", syncHeroLayout);
window.addEventListener("resize", syncHeroLayout);

if (clientTrack) {
    const clients = window.ROUTES.clients();

    clients.forEach(client => {
        const card = document.createElement("a");
        const logo = document.createElement("span");

        card.className = "client-card";
        card.href = window.ROUTES.client(client.key);
        card.setAttribute("aria-label", client.name);
        logo.className = "client-logo";

        if (client.logo) {
            const logoImage = document.createElement("img");

            logoImage.src = client.logo;
            logoImage.alt = "";
            logoImage.loading = "lazy";
            logo.appendChild(logoImage);
        } else {
            logo.textContent = client.name.slice(0, 2).toUpperCase();
        }

        card.appendChild(logo);
        clientTrack.appendChild(card);
    });

    window.createLoopCarousel(clientTrack, clientNavButtons);
}

if (projectTrack) {
    projects.forEach(project => {
        const card = document.createElement("a");
        const title = document.createElement("span");
        const meta = document.createElement("span");

        card.className = "project-slide-card";
        card.href = window.ROUTES.workSection(project.route);
        title.className = "project-slide-title";
        meta.className = "project-slide-meta";
        title.textContent = project.title;
        meta.textContent = project.meta;

        card.append(title, meta);
        projectTrack.appendChild(card);
    });

    window.createLoopCarousel(projectTrack, projectNavButtons, 3200);
}

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
