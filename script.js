
/* =========================================
   CheckoutCheck — JavaScript Interactivity
   Lab 3 | Prompt 3
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Select existing HTML elements
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  // 2. Mobile navigation functionality
  if (menuToggle && navLinks) {
    const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

    // Update menu visibility and accessibility state
    function setMenuState(isOpen) {
      navLinks.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    }

    // Open or close the menu when the button is clicked
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("is-open");
      setMenuState(!isOpen);
    });

    // Close the menu when a navigation link is clicked
    const menuLinks = navLinks.querySelectorAll("a");

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileBreakpoint.matches) {
          setMenuState(false);
        }
      });
    });

    // Close the menu using the Escape key
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        mobileBreakpoint.matches &&
        navLinks.classList.contains("is-open")
      ) {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    // Reset menu state when switching screen sizes
    function handleBreakpointChange() {
        const focusWasInsideMenu =
            navLinks.contains(document.activeElement);

        setMenuState(false);

        // Avoid leaving focus on an element that may become hidden.
        if (
            mobileBreakpoint.matches &&
            focusWasInsideMenu
        ) {
            menuToggle.focus();
        }
    }



    if (typeof mobileBreakpoint.addEventListener === "function") {
    mobileBreakpoint.addEventListener(
        "change",
        handleBreakpointChange
    );
    } else if (typeof mobileBreakpoint.addListener === "function") {
    mobileBreakpoint.addListener(handleBreakpointChange);
    }



    // Ensure the initial accessibility state is correct
    setMenuState(false);
  }

  // 3. Active navigation link tracking
  const sectionLinks = document.querySelectorAll(
    '.nav-links a[href^="#"], .footer-links a[href^="#"]'
  );

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if (sectionLinks.length > 0 && sections.length > 0) {
    // Identify the currently active page section

    function updateActiveNavigation() {
    let activeSectionId = sections[0].id;
    const activationPoint = window.scrollY + 160;

    const documentHeight =
        document.documentElement.scrollHeight;

    const viewportBottom =
        window.scrollY + window.innerHeight;

    const nearPageBottom =
        viewportBottom >= documentHeight - 2;

    if (nearPageBottom) {
        activeSectionId = sections[sections.length - 1].id;
    } else {
        sections.forEach((section) => {
        if (section.offsetTop <= activationPoint) {
            activeSectionId = section.id;
        }
        });
    }

    sectionLinks.forEach((link) => {
        const isActive =
        link.getAttribute("href") === `#${activeSectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
        link.setAttribute("aria-current", "location");
        } else {
        link.removeAttribute("aria-current");
        }
    });
    }


    // Update active links when scrolling
    let scrollScheduled = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollScheduled) {
          scrollScheduled = true;

          window.requestAnimationFrame(() => {
            updateActiveNavigation();
            scrollScheduled = false;
          });
        }
      },
      { passive: true }
    );

    // Update active links when the window is resized
    window.addEventListener("resize", updateActiveNavigation);

    // Initialize active navigation
    updateActiveNavigation();
  }
});
