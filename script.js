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

// Navigation scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");

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

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Simulate form submission
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(
      "Thank you! Your message has been sent successfully. I'll get back to you soon!"
    );
    this.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

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
                color: #188c43;
                text-shadow: 0 0 10px rgba(24, 140, 67, 0.5);
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
