document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
    }
  });

  // Navigation indicator
  var navLinks = document.querySelectorAll(".nav-links a");
  var navIndicator = document.querySelector(".nav-indicator");

  function updateNavIndicator() {
    var activeLink = document.querySelector(
      '.nav-links a[href="' + window.location.hash + '"]'
    );
    if (activeLink) {
      var linkRect = activeLink.getBoundingClientRect();
      var navRect = document
        .querySelector(".nav-links")
        .getBoundingClientRect();
      navIndicator.style.width = linkRect.width + "px";
      navIndicator.style.left = linkRect.left - navRect.left + "px";
    }
  }

  window.addEventListener("load", updateNavIndicator);
  window.addEventListener("hashchange", updateNavIndicator);

  for (var j = 0; j < navLinks.length; j++) {
    navLinks[j].addEventListener("mouseenter", function () {
      var linkRect = this.getBoundingClientRect();
      var navRect = document
        .querySelector(".nav-links")
        .getBoundingClientRect();
      navIndicator.style.width = linkRect.width + "px";
      navIndicator.style.left = linkRect.left - navRect.left + "px";
    });
    navLinks[j].addEventListener("mouseleave", updateNavIndicator);
  }

  var logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinksContainer = document.querySelector(".nav-links");
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinksContainer.classList.toggle("show");
    });
    navLinksContainer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () =>
        navLinksContainer.classList.remove("show")
      );
    });
  }

  // Animate on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slideInUp 0.8s ease-out forwards";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(
      ".skill-category, .project-card, .about-content > *, .contact-card"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      observer.observe(el);
    });

  // Handles opening, closing, and outside-click behavior for the demo modal(V-Architect View Demo btn)
  var modal = document.getElementById("demoModal");
  var btn = document.getElementById("viewDemoBtn");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Stats animation
  document.querySelectorAll(".stat-number").forEach((stat) => {
    const original = stat.textContent.trim();
    const isPercent = original.includes("%");
    const isPlus = original.includes("+");
    const target = parseInt(original.replace(/\D/g, ""), 10);
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 50));

    function updateStat() {
      if (current < target) {
        current += increment;
        stat.textContent =
          Math.min(current, target) + (isPercent ? "%" : isPlus ? "+" : "");
        setTimeout(updateStat, 20);
      } else {
        stat.textContent = target + (isPercent ? "%" : isPlus ? "+" : "");
      }
    }

    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateStat();
          observer.unobserve(entry.target); //  prevent multiple runs
        }
      });
    }).observe(stat);
  });
});
