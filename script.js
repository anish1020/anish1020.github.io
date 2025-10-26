// Modern Portfolio JavaScript - Interactive Animations & Functionality

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.setupScrollEffects();
    this.initializeTypewriter();
    this.initializeSkillsAnimation();
    this.initializeNavigation();
    this.initializeThemeToggle();
  }

  setupEventListeners() {
    window.addEventListener('load', () => {
      this.hideLoader();
    });

    // Throttle scroll events for better performance
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        this.handleScroll();
        scrollTimer = null;
      }, 16); // ~60fps
    }, { passive: true });

    // Debounce resize events
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }

  // Header scroll effect
  handleScroll() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Typewriter effect for hero subtitle
  initializeTypewriter() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;

    const texts = [
      'Full-Stack Developer',
      'Problem Solver',
      'Tech Enthusiast',
      'Creative Thinker'
    ];

    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const fullText = texts[currentIndex];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typeSpeed = 50;
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typeSpeed = 100;
      }

      textElement.textContent = currentText;

      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before starting new text
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }

  // Animate skill progress bars when they come into view
  initializeSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate skill level bars
          const skillLevel = entry.target.querySelector('.skill-level');
          if (skillLevel) {
            setTimeout(() => {
              skillLevel.classList.add('animate');
            }, 200);
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    skillItems.forEach((item) => {
      observer.observe(item);
    });
  }

  // Theme Toggle Functionality
  initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-checkbox');
    const html = document.documentElement;
    
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    if (savedTheme === 'light') {
      html.setAttribute('data-theme', 'light');
      themeToggle.checked = true;
    } else {
      html.removeAttribute('data-theme');
      themeToggle.checked = false;
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        this.updateParticleColors('light');
      } else {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        this.updateParticleColors('dark');
      }
      
      // Trigger theme change animation
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }
  
  // Update particle colors based on theme
  updateParticleColors(theme) {
    this.currentTheme = theme;
  }

  // Enhanced scroll animations
  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add stagger effect for grid items
          const gridItems = entry.target.querySelectorAll('.skill-item, .tech-item, .project-card, .stat-item, .timeline-item');
          gridItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.about, .skills, .projects, .experience-education, footer');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Initially hide grid items for animation
    const gridItems = document.querySelectorAll('.skill-item, .tech-item, .project-card, .stat-item, .timeline-item');
    gridItems.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  }

  // Navigation with optimized spacing for reduced top padding
  initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }

    // Smooth scrolling with optimized positioning for reduced spacing
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        let targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          let scrollPosition;
          
          if (targetId === '#home') {
            // For home section, scroll to the very top
            scrollPosition = 0;
          } else {
            // For other sections, use minimal top spacing
            const sectionTop = targetSection.offsetTop;
            
            // Reduced top margin for tighter layout
            const topMargin = window.innerWidth <= 768 ? 10 : 15; // Minimal margin
            
            scrollPosition = sectionTop - headerHeight - topMargin;
          }
          
          // Ensure we don't scroll above the top
          scrollPosition = Math.max(0, scrollPosition);
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }

        // Close mobile menu
        if (navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }

        // Update active link
        navLinks.forEach((navLink) => navLink.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Enhanced scroll highlighting for better accuracy
    let scrollTimeout;
    const handleScrollHighlighting = () => {
      const sections = document.querySelectorAll('section, footer');
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const viewportTop = window.scrollY + headerHeight;
      const viewportBottom = viewportTop + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the very bottom
      const isAtBottom = window.scrollY + window.innerHeight >= documentHeight - 50;
      
      let activeSection = null;
      let maxVisibility = 0;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        const sectionId = section.getAttribute('id');
        
        // Special case for contact section when at bottom
        if (sectionId === 'contact' && isAtBottom) {
          activeSection = sectionId;
          return;
        }
        
        // Calculate what percentage of the section is visible
        const visibleTop = Math.max(sectionTop, viewportTop);
        const visibleBottom = Math.min(sectionBottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityPercentage = visibleHeight / sectionHeight;
        
        // Prioritize sections that are more than 30% visible and closest to center
        if (visibilityPercentage > 0.3 && visibilityPercentage > maxVisibility) {
          activeSection = sectionId;
          maxVisibility = visibilityPercentage;
        }
      });

      // Update active navigation link
      if (activeSection) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          const linkHref = link.getAttribute('href');
          
          if (linkHref === `#${activeSection}`) {
            link.classList.add('active');
          }
        });
      }
    };

    // Add scroll event listener with throttling
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollHighlighting, 16); // ~60fps
    });

    // Initial call
    handleScrollHighlighting();
  }

  // Initialize various animations
  initializeAnimations() {
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        animation: fadeInUp 0.8s ease forwards;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .project-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      }
    `;
    document.head.appendChild(style);
  }

  // Handle window resize
  handleResize() {
    // Update any responsive calculations if needed
    this.updateParallax();
  }

  // Hide loader (if you want to add a loading screen)
  hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }
}

// Enhanced form submission
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.scriptURL = 'https://script.google.com/macros/s/AKfycbyBIBxG-TD1A1F6wJp7cV1PO7vqjvvWwO_ztMTq2FwnAI49grVG6g5zCJXr8MzQa1eA/exec';
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });

    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateForm()) {
      const submitBtn = this.form.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      const formData = {
        name: this.form.querySelector('#name').value,
        email: this.form.querySelector('#email').value,
        message: this.form.querySelector('#message').value
      };

      fetch(this.scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          this.form.reset();
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.style.background = '#ef4444';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      });
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (!value) {
      errorMessage = 'This field is required';
      isValid = false;
    } else if (field.type === 'email' && !this.isValidEmail(value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(field, message) {
    this.clearError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ef4444';
  }

  clearError(field) {
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
    field.style.borderColor = '';
  }
}

// Smooth scrolling for scroll indicator
document.addEventListener('DOMContentLoaded', () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  new ContactForm();
});

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0.7;
    }
    100% {
      transform: translateY(-100px) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyle);
