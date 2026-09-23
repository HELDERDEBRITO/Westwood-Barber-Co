document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // INTRO / LOADING SCREEN
    // ========================================

    const intro = document.getElementById("intro-screen");

    if (intro) {

        document.body.classList.add("intro-active");

        const finishIntro = () => {

            setTimeout(() => {

                intro.classList.add("intro-finished");
                document.body.classList.remove("intro-active");

            }, 3800);

        };

        if (document.readyState === "complete") {
            finishIntro();
        } else {
            window.addEventListener("load", finishIntro, {
                once: true
            });
        }
    }


    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("main-nav");

    const closeMenu = () => {

        if (!menuToggle || !nav) {
            return;
        }

        nav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove(
            "mobile-nav-open"
        );
    };


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", event => {

            event.stopPropagation();

            const isOpen =
                nav.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            document.body.classList.toggle(
                "mobile-nav-open",
                isOpen
            );
        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        document.addEventListener("click", event => {

            if (
                nav.classList.contains("active") &&
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });


        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                nav.classList.contains("active")
            ) {

                closeMenu();

                menuToggle.focus();
            }

        });


        window.addEventListener("resize", () => {

            if (
                window.innerWidth > 900 &&
                nav.classList.contains("active")
            ) {
                closeMenu();
            }

        });

    }


    // ========================================
    // BOOKING FORM
    // ========================================

    const bookingForm =
        document.getElementById("booking-form");

    const dateInput =
        document.getElementById("date");

    const messageInput =
        document.getElementById("message");

    const characterCount =
        document.getElementById("character-count");


    // ========================================
    // MINIMUM BOOKING DATE
    // ========================================

    if (dateInput) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");

        dateInput.min =
            `${year}-${month}-${day}`;
    }


    // ========================================
    // CHARACTER COUNTER
    // ========================================

    const updateCharacterCount = () => {

        if (!messageInput || !characterCount) {
            return;
        }

        const length =
            messageInput.value.length;

        characterCount.textContent =
            `${length} / 500`;
    };


    if (messageInput) {

        messageInput.addEventListener(
            "input",
            updateCharacterCount
        );

        updateCharacterCount();
    }


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nameInput =
                    document.getElementById("name");

                const phoneInput =
                    document.getElementById("phone");

                const emailInput =
                    document.getElementById("email");

                const serviceInput =
                    document.getElementById("service");

                const timeInput =
                    document.getElementById("time");

                if (
                    !nameInput ||
                    !phoneInput ||
                    !emailInput ||
                    !serviceInput ||
                    !dateInput ||
                    !timeInput
                ) {
                    return;
                }


                // Trim text fields

                nameInput.value =
                    nameInput.value.trim();

                phoneInput.value =
                    phoneInput.value.trim();

                emailInput.value =
                    emailInput.value.trim();


                // Native validation

                if (!bookingForm.checkValidity()) {

                    bookingForm.reportValidity();

                    return;
                }


                const name =
                    nameInput.value;

                const phone =
                    phoneInput.value;

                const email =
                    emailInput.value;

                const service =
                    serviceInput
                        .options[
                            serviceInput.selectedIndex
                        ]
                        .text;

                const date =
                    dateInput.value;

                const time =
                    timeInput
                        .options[
                            timeInput.selectedIndex
                        ]
                        .text;


                // Remove previous message

                const existingMessage =
                    bookingForm.querySelector(
                        ".booking-success"
                    );

                if (existingMessage) {
                    existingMessage.remove();
                }


                // Button loading state

                const submitButton =
                    bookingForm.querySelector(
                        ".form-submit"
                    );

                if (submitButton) {

                    submitButton.classList.add(
                        "is-loading"
                    );

                    submitButton.textContent =
                        "Request Received";

                }


                // Create confirmation

                const successMessage =
                    document.createElement("p");

                successMessage.className =
                    "booking-success";

                successMessage.setAttribute(
                    "role",
                    "status"
                );

                successMessage.textContent =
                    `Thank you, ${name}. Your request for ${service} on ${date} at ${time} has been received. We'll contact you at ${phone} or ${email} to confirm.`;


                bookingForm.appendChild(
                    successMessage
                );


                // Reset after capturing values

                bookingForm.reset();

                updateCharacterCount();


                // Keep success state visible

                window.setTimeout(() => {

                    if (submitButton) {

                        submitButton.classList.remove(
                            "is-loading"
                        );

                        submitButton.textContent =
                            "Request Appointment";
                    }

                }, 2500);

            }
        );
    }


    // ========================================
    // HEADER ON SCROLL
    // ========================================

    const header =
        document.querySelector(".header");


    if (header) {

        const updateHeader =
            () => {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY > 50
                );
            };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );
    }


    // ========================================
    // REVEAL ANIMATIONS
    // ========================================

    const revealElements =
        document.querySelectorAll(
            ".service-card, .barber-card, .gallery-item, .about-content"
        );


    if (revealElements.length) {

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {

            revealElements.forEach(element => {

                element.classList.add(
                    "reveal-visible"
                );

            });

        } else {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        });

                    },
                    {
                        threshold: 0.1,
                        rootMargin: "0px 0px -40px 0px"
                    }
                );


            revealElements.forEach(
                (element, index) => {

                    element.classList.add(
                        "reveal-ready"
                    );

                    element.style.transition =
                        `opacity .7s ease ${index * 0.05}s, transform .7s ease ${index * 0.05}s`;

                    observer.observe(element);
                }
            );
        }
    }


    // ========================================
    // SMOOTH ANCHOR SCROLL
    // ========================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const reducedMotion =
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches;

                    target.scrollIntoView({
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth",
                        block: "start"
                    });

                }
            );

        });


    // ========================================
    // PHONE NUMBER CLEANUP
    // ========================================

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );

    phoneLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add(
                    "phone-clicked"
                );

            }
        );

    });

});