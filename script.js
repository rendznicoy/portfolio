// Initialize AOS
AOS.init({
  offset: 50,
  duration: 1000,
  once: true,
});

// Loading Screen
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.classList.add("fade-out");
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  }, 1000);
});

// Show/hide scroll to top button based on scroll position
window.addEventListener("scroll", () => {
  const scrollTop = document.getElementById("scrollTop");
  const navbar = document.getElementById("navbar");

  // Show button when scrolled down 300px
  if (window.scrollY > 300) {
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }

  // Navbar scroll effect (existing code)
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile navigation
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const dropdown = document.querySelector(".dropdown");
  const cancel = document.querySelector(".cancel");
  const body = document.body;

  // Toggle dropdown
  function toggleDropdown() {
    if (dropdown) {
      dropdown.classList.toggle("active");
      if (dropdown.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  }

  // Close dropdown
  window.closeDropdown = function () {
    if (dropdown) {
      dropdown.classList.remove("active");
      body.style.overflow = "auto";
    }
  };

  // Event listeners
  if (hamburger) {
    hamburger.addEventListener("click", toggleDropdown);
  }

  if (cancel) {
    cancel.addEventListener("click", closeDropdown);
  }

  // Close dropdown when clicking on navigation links
  const dropdownLinks = document.querySelectorAll(".dropdown .links a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", closeDropdown);
  });

  // Close when clicking outside
  if (dropdown) {
    dropdown.addEventListener("click", (e) => {
      if (e.target === dropdown) {
        closeDropdown();
      }
    });
  }
});

// Typewritter Effect

const typewriter = document.getElementById("typewritter");
const words = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Freelancer",
  "Problem Solver",
  "Tech Enthusiast",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWrite() {
  if (!typewriter) return; // Safety check

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriter.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeWrite, isDeleting ? 100 : 200);
}

// Start typewriter effect after page load
setTimeout(typeWrite, 2000);

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Trigger skill bars animation when skills section is visible
const skillsSection = document.getElementById("skills");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
      }
    });
  },
  { threshold: 0.3 }
);

skillsObserver.observe(skillsSection);

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

// Scroll to top functionality
document.getElementById("scrollTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Custom Email Toast Function
function showEmailToast(event) {
  event.preventDefault();

  const emailAddress = "rendzdelosreyes@gmail.com";
  const container = document.querySelector(".toast-container");

  const emailToast = document.createElement("div");
  emailToast.className = "toast email-toast show";

  emailToast.innerHTML = `
    <div class="email-toast-content">
      <div class="email-toast-header">
        <i class="fas fa-envelope email-toast-icon"></i>
        <h4 class="email-toast-title">Get in Touch</h4>
        <button class="toast-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="email-toast-body">
        Ready to collaborate or have a question? Feel free to reach out!
        <div class="email-address">${emailAddress}</div>
      </div>
      <div class="email-toast-actions">
        <button class="email-action-btn email-copy-btn" onclick="copyEmailAddress('${emailAddress}', this)">
          <i class="fas fa-copy"></i>
          Copy Email
        </button>
        <button class="email-action-btn email-open-btn" onclick="openEmailClient('${emailAddress}')">
          <i class="fas fa-external-link-alt"></i>
          Open Mail App
        </button>
      </div>
    </div>
  `;

  container.appendChild(emailToast);

  // Close button functionality
  const closeBtn = emailToast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    removeEmailToast(emailToast);
  });

  // Auto remove after 8 seconds
  const autoRemove = setTimeout(() => {
    removeEmailToast(emailToast);
  }, 8000);

  // Pause auto-remove on hover
  emailToast.addEventListener("mouseenter", () => {
    clearTimeout(autoRemove);
  });

  emailToast.addEventListener("mouseleave", () => {
    setTimeout(() => removeEmailToast(emailToast), 3000);
  });
}

// Copy email address function
function copyEmailAddress(email, button) {
  navigator.clipboard
    .writeText(email)
    .then(() => {
      const originalContent = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      button.style.background = "rgba(16, 185, 129, 0.3)";

      setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.background = "";
      }, 2000);

      // Show mini success toast
      toast.success(
        "Email Copied!",
        "Email address has been copied to your clipboard.",
        3000
      );
    })
    .catch(() => {
      toast.error(
        "Copy Failed",
        "Please manually copy the email address.",
        3000
      );
    });
}

// Open email client function
function openEmailClient(email) {
  window.location.href = `mailto:${email}?subject=Hello from your portfolio visitor`;
}

// Remove email toast function
function removeEmailToast(emailToast) {
  emailToast.style.transform =
    window.innerWidth <= 480 ? "translateY(-100%)" : "translateX(100%)";
  emailToast.style.opacity = "0";

  setTimeout(() => {
    if (emailToast.parentNode) {
      emailToast.parentNode.removeChild(emailToast);
    }
  }, 400);
}

// Toast Notification System
class ToastNotification {
  constructor() {
    this.createContainer();
  }

  createContainer() {
    if (!document.querySelector(".toast-container")) {
      const container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
  }

  show(type, title, message, duration = 5000) {
    const container = document.querySelector(".toast-container");
    const toast = document.createElement("div");

    const icon =
      type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";

    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="${icon} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
      <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Close button functionality
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => {
      this.remove(toast);
    });

    // Auto remove after duration
    const autoRemove = setTimeout(() => {
      this.remove(toast);
    }, duration);

    // Pause auto-remove on hover
    toast.addEventListener("mouseenter", () => {
      clearTimeout(autoRemove);
      const progressBar = toast.querySelector(".toast-progress");
      progressBar.style.animationPlayState = "paused";
    });

    toast.addEventListener("mouseleave", () => {
      const remainingTime = this.getRemainingTime(
        toast.querySelector(".toast-progress")
      );
      setTimeout(() => this.remove(toast), remainingTime);
    });

    return toast;
  }

  remove(toast) {
    toast.style.transform =
      window.innerWidth <= 440 ? "translateY(-100%)" : "translateX(100%)";
    toast.style.opacity = "0";

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }

  getRemainingTime(progressBar) {
    const computedStyle = window.getComputedStyle(progressBar);
    const animationDuration =
      parseFloat(computedStyle.animationDuration) * 1000;
    const transform = computedStyle.transform;

    if (transform === "none") return 0;

    const matrix = new WebKitCSSMatrix(transform);
    const scaleX = matrix.a;
    return animationDuration * scaleX;
  }

  success(title, message, duration) {
    return this.show("success", title, message, duration);
  }

  error(title, message, duration) {
    return this.show("error", title, message, duration);
  }
}

// Initialize toast system
const toast = new ToastNotification();

// EmailJS Configuration and Form Handler with Toast Notifications
(function () {
  emailjs.init("u6qm0AaZcMJ3apnGt");

  // Form submission handler
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const submitBtn = document.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Send email using EmailJS
      emailjs.sendForm("service_lyd0ccp", "template_17cx0el", this).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);

          // Success toast notification
          toast.success(
            "Message Sent Successfully!",
            "Thank you for reaching out! I'll get back to you as soon as possible."
          );

          document.getElementById("contactForm").reset();

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        },
        function (error) {
          console.log("FAILED...", error);

          // Error toast notification
          toast.error(
            "Message Failed to Send",
            "Sorry, there was an error sending your message. Please try again or contact me directly."
          );

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      );
    });
})();

// Add active class to navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Particle effect on hero section
function createParticles() {
  const heroSection = document.querySelector(".hero-section");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(24, 140, 67, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float ${Math.random() * 10 + 5}s linear infinite;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 5}s;
                `;
    heroSection.appendChild(particle);
  }
}

// Floating animation for particles
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10%, 90% {
            opacity: 1;
        }
        50% {
            transform: translateY(-100px) translateX(50px);
        }
    }
    
    .nav-container .links .link a.active {
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    
    .nav-container .links .link a.active::before {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Add typing cursor blink effect
setInterval(() => {
  const cursor = document.querySelector(".typewritter-text::after");
  if (cursor) {
    cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
  }
}, 500);

// Mobile menu functionality
const body = document.body;

document.querySelector(".cancel").addEventListener("click", () => {
  dropdown.classList.remove("active");
  body.style.overflow = "auto";
});

// CLose mobile menu when clicking outside
dropdown.addEventListener("click", (e) => {
  if (e.target === dropdown) {
    dropdown.classList.remove("active");
    body.style.overflow = "auto";
  }
});

// Image lazy loading effect
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }
  });
});

document.querySelectorAll("img").forEach((img) => {
  img.style.opacity = "0";
  img.style.transform = "scale(0.8)";
  img.style.transition = "all 0.5s ease";
  imageObserver.observe(img);
});

// Add scroll progress indicator
const progressBar = document.createElement("div");
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ffffff, #e0e0e0);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollPercent =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrollPercent + "%";
});

// Add click ripple effect to buttons
function addRippleEffect(element) {
  element.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

// Add ripple effect to buttons
document.querySelectorAll("button").forEach(addRippleEffect);

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(rippleStyle);

// Download CV function
function downloadCV() {
  const cvUrl = "./assets/files/delosReyes_CV_Refined.pdf";
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = "Rene_Angelo_de_los_Reyes_CV.pdf"; // The filename for download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

console.log("Rene Angelo Portfolio - Loaded Successfully!");
console.log("Typewriter effect fixed for mobile!");
