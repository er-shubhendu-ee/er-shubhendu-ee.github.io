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

const typingText =

    document
        .getElementById(
            "typingText");

let roleIndex = 0;

let charIndex = 0;

let deleting = false;

function animateTyping() {

    const current =

        roles[
        roleIndex];

    if (!deleting) {

        typingText
            .textContent =

            current.slice(
                0,
                charIndex++);

        if (

            charIndex >
            current.length

        ) {

            deleting = true;

            setTimeout(

                animateTyping,

                1500

            );

            return;

        }

    }
    else {

        typingText
            .textContent =

            current.slice(
                0,
                charIndex--);

        if (

            charIndex === 0

        ) {

            deleting = false;

            roleIndex =

                (roleIndex + 1)
                %
                roles.length;

        }

    }

    setTimeout(

        animateTyping,

        deleting
            ?
            40
            :
            90

    );

}

animateTyping();

const skillsContainer =

    document
        .getElementById(
            "skillsContainer");

skills.forEach(

    skill => {

        const item =

            document
                .createElement(
                    "div");

        item.className =

            "skill";

        item.textContent =

            skill;

        skillsContainer
            .appendChild(
                item);

    }

);

const menuButton =

    document
        .getElementById(
            "menuButton");

const navLinks =

    document
        .querySelector(
            ".nav-links");

menuButton
    .addEventListener(

        "click",

        () => {

            navLinks
                .classList
                .toggle(
                    "active");

        }

    );

document
    .querySelectorAll(
        ".nav-links a")
    .forEach(

        item => {

            item
                .addEventListener(

                    "click",

                    () => {

                        navLinks
                            .classList
                            .remove(
                                "active");

                    }

                );

        }

    );

window
    .addEventListener(

        "scroll",

        () => {

            const cards =

                document
                    .querySelectorAll(

                        ".project-card"

                    );

            cards.forEach(

                card => {

                    const top =

                        card
                            .getBoundingClientRect()
                            .top;

                    if (

                        top <
                        window
                            .innerHeight
                        - 80

                    ) {

                        card.style.opacity = 1;

                        card.style.transform =

                            "translateY(0px)";

                    }

                }

            );

        }

    );

document
    .querySelectorAll(

        ".project-card"

    )

    .forEach(

        card => {

            card.style.opacity = 0;

            card.style.transform =

                "translateY(30px)";

            card.style.transition =

                ".5s";

        }

    );