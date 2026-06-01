const roles = [
    "Embedded Systems Developer",
    "Firmware Engineer",
    "BLE Systems Developer",
    "USB Firmware Engineer",
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
    "STM32MP1",
    "Bootloaders",
    "KiCad",
    "Gmsh",
    "Elmer FEM"
];

const clients = [
    { logo: "C1", name: "Client One", route: "clientOne" },
    { logo: "C2", name: "Client Two", route: "clientTwo" },
    { logo: "C3", name: "Client Three", route: "clientThree" },
    { logo: "C4", name: "Client Four", route: "clientFour" },
    { logo: "C5", name: "Client Five", route: "clientFive" },
    { logo: "C6", name: "Client Six", route: "clientSix" }
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
    clients.forEach(client => {
        const card = document.createElement("a");
        const logo = document.createElement("span");
        const name = document.createElement("span");

        card.className = "client-card";
        card.href = window.ROUTES.client(client.route);
        logo.className = "client-logo";
        name.className = "client-name";
        logo.textContent = client.logo;
        name.textContent = client.name;

        card.append(logo, name);
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
