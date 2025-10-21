// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

// Check for saved theme or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

// Hide loading screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Matrix Rain Effect
function createMatrixRain() {
  const matrixContainer = document.getElementById("matrixRain");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const columns = Math.floor(window.innerWidth / 20);

  for (let i = 0; i < columns; i++) {
    const char = document.createElement("div");
    char.className = "matrix-char";
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = i * 20 + "px";
    char.style.animationDuration = Math.random() * 3 + 2 + "s";
    char.style.animationDelay = Math.random() * 2 + "s";
    matrixContainer.appendChild(char);
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;

  // Navbar transparency
  if (scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    if (document.body.getAttribute("data-theme") === "light") {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.9)";
    if (document.body.getAttribute("data-theme") === "light") {
      navbar.style.background = "rgba(255, 255, 255, 0.9)";
    }
  }

  // Show/hide scroll to top button
  if (scrollY > 300) {
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }
});

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = "0%";
          setTimeout(() => {
            entry.target.style.width = width + "%";
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// Fixed Animate circular progress bars
function animateCircularProgress() {
  const circles = document.querySelectorAll(".progress-circle-fill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute("data-progress");
          const circumference = 2 * Math.PI * 52;
          const offset = circumference - (progress / 100) * circumference;

          entry.target.style.strokeDasharray = `${circumference}`;
          entry.target.style.strokeDashoffset = circumference;

          setTimeout(() => {
            entry.target.style.strokeDashoffset = offset;
          }, 200);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  circles.forEach((circle) => observer.observe(circle));
}

// Create floating particles
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stats-number[data-count]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute("data-count"));
          let current = 0;
          const increment = target / 50;
          const suffix = entry.target.textContent.includes("+")
            ? "+"
            : entry.target.textContent.includes("%")
            ? "%"
            : "";

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target + suffix;
              clearInterval(timer);
            } else {
              entry.target.textContent = Math.ceil(current) + suffix;
            }
          }, 50);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// Enhanced scroll effects
function handleScroll() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".bg-animation");
  const speed = scrolled * 0.3;
  parallax.style.transform = `translateY(${speed}px)`;
}

// Add ripple effect to cards
function addRippleEffect() {
  document
    .querySelectorAll(
      ".glass-card, .stats-card, .project-card, .contact-card, .skill-card"
    )
    .forEach((card) => {
      card.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 1000);
      });
    });
}

// Typing effect for hero title
function typeWriter() {
  const heroTitle = document.querySelector(".hero-title");
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.borderRight = "3px solid var(--primary-color)";

  let i = 0;
  function type() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      setTimeout(() => {
        heroTitle.style.borderRight = "none";
      }, 1000);
    }
  }

  setTimeout(type, 1000);
}

// Enhanced button hover effects
function enhanceButtons() {
  document
    .querySelectorAll(".btn-primary-custom, .btn-secondary-custom")
    .forEach((btn) => {
      btn.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.05)";
      });

      btn.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
}

// Intersection Observer for fade-in animations
function setupFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });
}

// Dynamic theme updates
function updateThemeElements() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        const theme = document.body.getAttribute("data-theme");

        // Update navbar background
        if (window.scrollY > 50) {
          navbar.style.background =
            theme === "light"
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(10, 10, 10, 0.95)";
        } else {
          navbar.style.background =
            theme === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(10, 10, 10, 0.9)";
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Enhanced cursor interactions
function enhanceCursorInteractions() {
  const interactiveElements = document.querySelectorAll(
    "a, button, .glass-card, .stats-card, .project-card, .contact-card, .skill-card"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      // Cursor interactions removed
    });

    element.addEventListener("mouseleave", () => {
      // Cursor interactions removed
    });
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize matrix rain effect
  createMatrixRain();

  // Initialize animations
  animateSkillBars();
  animateCircularProgress();
  animateCounters();

  // Initialize particles
  createParticles();

  // Initialize interactions
  addRippleEffect();
  enhanceButtons();
  enhanceCursorInteractions();

  // Initialize theme system
  updateThemeElements();

  // Initialize scroll animations
  setupFadeInAnimations();

  // Add optimized scroll listener
  window.addEventListener("scroll", throttle(handleScroll, 16));

  // Add typing effect delay
  setTimeout(typeWriter, 2000);

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "T" && e.ctrlKey) {
      e.preventDefault();
      themeToggle.click();
    }
  });

  // Add focus management for accessibility
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("focus", () => {
      element.style.outline = "2px solid var(--primary-color)";
      element.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", () => {
      element.style.outline = "none";
    });
  });

  // Add smooth page transitions
  let isTransitioning = false;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!isTransitioning) {
        isTransitioning = true;
        document.body.style.transition = "opacity 0.3s ease";
        document.body.style.opacity = "0.9";

        setTimeout(() => {
          document.body.style.opacity = "1";
          isTransitioning = false;
        }, 300);
      }
    });
  });

  // Add mobile touch gestures
  let startY = 0;
  document.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        // Swipe up - show scroll to top
        scrollTop.style.opacity = "1";
        scrollTop.style.visibility = "visible";
      }
    }
  });

  // Add dynamic favicon based on theme
  const favicon =
    document.querySelector('link[rel="icon"]') ||
    document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";

  function updateFavicon() {
    const theme = document.body.getAttribute("data-theme");
    const color = theme === "light" ? "%23000000" : "%2300D4FF";
    favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='${color}'>📊</text></svg>`;
  }

  updateFavicon();
  document.head.appendChild(favicon);

  // Update favicon when theme changes
  const themeObserver = new MutationObserver(updateFavicon);
  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});

// Service Worker for offline functionality (for GitHub Pages)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Add console signature
console.log(`
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║         🚀 Hesham Ahmed              ║
        ║         📊 Data Specialist           ║
        ║         💼 Portfolio v2.0            ║
        ║                                      ║
        ║    Made with ❤️ for data insights   ║
        ║                                      ║
        ╚══════════════════════════════════════╝
        
        👋 Hello there, fellow developer!
        💡 Interested in data analytics?
        📧 Contact: kiradata3@gmail.com
        🌟 GitHub: github.com/HeshamXOR
        `);

// Error handling for better UX
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error);
  // Could show a user-friendly error message here
});

// Add performance monitoring
window.addEventListener("load", () => {
  const perfData = performance.getEntriesByType("navigation")[0];
  console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd)} ms`);
});

// Progressive Web App features
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
  // Could show an install banner here
});

// Simple service worker content for caching
const SW_CONTENT = `
        const CACHE_NAME = 'hesham-portfolio-v1';
        const urlsToCache = [
            '/',
            '/index.html',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
            'https://unpkg.com/aos@2.3.1/dist/aos.css'
        ];

        self.addEventListener('install', (event) => {
            event.waitUntil(
                caches.open(CACHE_NAME)
                    .then((cache) => cache.addAll(urlsToCache))
            );
        });

        self.addEventListener('fetch', (event) => {
            event.respondWith(
                caches.match(event.request)
                    .then((response) => {
                    return response || fetch(event.request);
                    })
            );
        });
    `;

// Create service worker file blob
if ("serviceWorker" in navigator) {
  const swBlob = new Blob([SW_CONTENT], {
    type: "application/javascript",
  });
  const swUrl = URL.createObjectURL(swBlob);

  navigator.serviceWorker
    .register(swUrl)
    .then(() => console.log("🎉 Service Worker registered successfully"))
    .catch((error) =>
      console.log("❌ Service Worker registration failed:", error)
    );
}
