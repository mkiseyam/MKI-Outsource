/* =====================================================
   MKI OUTSOURCE — MAIN JAVASCRIPT
===================================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

            document.body.classList.add("loaded");

        }, 900);

    });


    /* =================================================
       NAVBAR SCROLL EFFECT
    ================================================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn = document.querySelector(".menu-btn");

    const mobileMenu = document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");


    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        menuBtn.classList.toggle("active");

    });


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            menuBtn.classList.remove("active");

        });

    });


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-grid, " +
        ".service-row, " +
        ".process-card, " +
        ".statement-content, " +
        ".cta-content, " +
        ".stats"
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =================================================
       SERVICE ROW STAGGER
    ================================================= */

    const serviceRows =
        document.querySelectorAll(".service-row");


    serviceRows.forEach((row, index) => {

        row.style.transitionDelay =
            `${index * 80}ms`;

    });


    /* =================================================
       PROCESS CARD STAGGER
    ================================================= */

    const processCards =
        document.querySelectorAll(".process-card");


    processCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 120}ms`;

    });


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters =
        document.querySelectorAll("[data-count]");


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const counter =
                        entry.target;

                    const target =
                        Number(counter.dataset.count);


                    let current = 0;

                    const duration = 1400;

                    const startTime =
                        performance.now();


                    function updateCounter(time) {

                        const progress =
                            Math.min(
                                (time - startTime) / duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        current =
                            Math.floor(
                                target * eased
                            );


                        if (target === 24) {

                            counter.textContent =
                                `${current}/7`;

                        }

                        else if (target === 100) {

                            counter.textContent =
                                `${current}%`;

                        }

                        else {

                            counter.textContent =
                                `${current}+`;

                        }


                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );


                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });


    /* =================================================
       MOUSE PARALLAX — HERO
    ================================================= */

    const heroVisual =
        document.querySelector(".hero-visual");

    const visualCard =
        document.querySelector(".visual-card");


    if (
        heroVisual &&
        visualCard &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 5;


                const rotateX =
                    ((centerY - y) /
                        centerY) * 5;


                visualCard.style.transform =
                    `perspective(1000px)
                     rotateY(${rotateY}deg)
                     rotateX(${rotateX}deg)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                visualCard.style.transform =
                    `perspective(1000px)
                     rotateY(-8deg)
                     rotateX(4deg)`;

            }
        );

    }


    /* =================================================
       SMOOTH ANCHOR LINKS
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    targetId === "#" ||
                    targetId === ""
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    const offset =
                        70;


                    const position =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;


                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* =================================================
       DYNAMIC YEAR
    ================================================= */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


});