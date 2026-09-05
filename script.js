/* =========================================
   MARWAN ALQASERAWI — PHASE 1.0
   INTERACTIONS
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("hidden");

        document.querySelectorAll(".hero-line").forEach((line, index) => {
            setTimeout(() => {
                line.classList.add("visible");
            }, index * 130);
        });

        document.querySelectorAll(".hero .reveal").forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("visible");
            }, 350 + index * 120);
        });

    }, 900);

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let followerX = mouseX;
let followerY = mouseY;


window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});


function animateCursor() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);

}

animateCursor();


document.querySelectorAll("a, button").forEach((element) => {

    element.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-active");
    });

    element.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-active");
    });

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");

});


document.querySelectorAll(".mobile-menu a").forEach((link) => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

    });

});


/* =========================================
   SCROLL REVEALS
========================================= */

const revealElements = document.querySelectorAll(
    ".reveal"
);


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


revealElements.forEach((element) => {

    if (!element.closest(".hero")) {
        revealObserver.observe(element);
    }

});


/* =========================================
   PARALLAX
========================================= */

const parallaxElements = document.querySelectorAll("[data-parallax]");


function updateParallax() {

    const scrollY = window.scrollY;

    parallaxElements.forEach((element) => {

        const rect = element.parentElement.getBoundingClientRect();

        const center =
            rect.top +
            rect.height / 2 -
            window.innerHeight / 2;

        const movement = center * -0.08;

        element.style.transform =
            `translate3d(0, ${movement}px, 0) scale(1.06)`;

    });

}


window.addEventListener(
    "scroll",
    updateParallax,
    { passive: true }
);

updateParallax();


/* =========================================
   COUNTERS
========================================= */

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const element = entry.target;
            const target = Number(element.dataset.count);

            let start = 0;
            const duration = 1600;
            const startTime = performance.now();


            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const eased =
                    1 - Math.pow(1 - progress, 3);

                const current =
                    Math.floor(start + (target - start) * eased);

                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {

                    if (target === 97) {
                        element.textContent = "97%";
                    }

                    if (target === 8) {
                        element.textContent = "8+";
                    }

                    if (target === 500) {
                        element.textContent = "500+";
                    }

                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(element);

        });

    },
    {
        threshold: 0.7
    }
);


counters.forEach((counter) => {
    counterObserver.observe(counter);
});


/* =========================================
   PROGRAM CARD TILT
========================================= */

const cards = document.querySelectorAll(".program-card");


cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateX =
            (0.5 - y) * 3;

        const rotateY =
            (x - 0.5) * 3;


        card.style.transform =
            `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1200px) rotateX(0) rotateY(0)";

    });

});


/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   NAVBAR SCROLL BEHAVIOR
========================================= */

const navbar = document.querySelector(".navbar");

let previousScroll = window.scrollY;

window.addEventListener(
    "scroll",
    () => {

        const currentScroll = window.scrollY;

        if (currentScroll > previousScroll && currentScroll > 150) {

            navbar.style.transform = "translateY(-120px)";

        } else {

            navbar.style.transform = "translateY(0)";

        }

        previousScroll = currentScroll;

    },
    { passive: true }
);


/* =========================================
   IMAGE LOAD EFFECT
========================================= */

document.querySelectorAll(".program-image img").forEach((image) => {

    image.addEventListener("load", () => {

        image.style.opacity = "1";

    });

});


/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */

const magneticElements = document.querySelectorAll(
    ".circle-button, .contact-button, .nav-cta"
);


magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 900) return;

        const rect = element.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        element.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform = "";

    });

});


/* =========================================
   PAGE VISIBILITY
========================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {
            document.title =
                "Come back stronger. | Marwan Alqaserawi";
        } else {
            document.title =
                "Marwan Alqaserawi | Performance Coach";
        }

    }
);
