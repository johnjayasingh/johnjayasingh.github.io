// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  mobileMenu.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = mobileMenu.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
      if (navMenu.classList.contains('active')) {
        if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (index === 1) bar.style.opacity = '0';
        if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
      }
    });
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const bars = mobileMenu.querySelectorAll('.bar');
      bars.forEach(bar => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
      });
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll('section');
  
  function highlightActiveSection() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .education-item, .highlight-item');
  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Typing animation for hero text
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Initialize typing animation
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    setTimeout(() => {
      typeWriter(heroSubtitle, originalText, 50);
    }, 1000);
  }

  // Skill item hover effects
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Timeline item stagger animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Contact form validation (if you add a form later)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const email = this.querySelector('input[type="email"]');
      const message = this.querySelector('textarea');
      
      if (!email.value || !message.value) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Here you would typically send the form data to a server
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.reset();
    });
  }

  // Smooth reveal animations for cards
  const cards = document.querySelectorAll('.profile-card, .info-card, .contact-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = this.style.transform.replace('scale(1)', 'scale(1.02)');
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = this.style.transform.replace('scale(1.02)', 'scale(1)');
    });
  });

  // Copy email to clipboard functionality
  const emailElements = document.querySelectorAll('[href^="mailto:"]');
  emailElements.forEach(element => {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      const email = this.getAttribute('href').replace('mailto:', '');
      
      // Try to copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showNotification('Email copied to clipboard!');
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Email copied to clipboard!');
      }
      
      // Still open default email client after a delay
      setTimeout(() => {
        window.location.href = this.getAttribute('href');
      }, 1000);
    });
  });

  // Show notification function
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      opacity: 0;
      transform: translateX(100px);
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Easter egg: Konami code
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
  
  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      // Add some fun animation
      document.body.style.animation = 'rainbow 2s ease-in-out';
      showNotification('🎉 Konami Code activated! You found the easter egg!');
      
      setTimeout(() => {
        document.body.style.animation = '';
      }, 2000);
    }
  });

  // Add rainbow animation to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      50% { filter: hue-rotate(180deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Performance optimization: Throttle scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply throttling to scroll events
  const throttledScrollHandler = throttle(() => {
    highlightActiveSection();
  }, 100);

  window.addEventListener('scroll', throttledScrollHandler);

  // Initialize AOS (Animate On Scroll) alternative
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
      const animationType = element.getAttribute('data-animate');
      element.style.opacity = '0';
      
      switch(animationType) {
        case 'fadeInUp':
          element.style.transform = 'translateY(30px)';
          break;
        case 'fadeInLeft':
          element.style.transform = 'translateX(-30px)';
          break;
        case 'fadeInRight':
          element.style.transform = 'translateX(30px)';
          break;
        case 'fadeIn':
          break;
      }
      
      observer.observe(element);
    });
  }

  // Update intersection observer to handle custom animations
  const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) translateX(0)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
  }, observerOptions);

  // Re-observe elements with the new observer
  const customAnimateElements = document.querySelectorAll('[data-animate]');
  customAnimateElements.forEach(el => {
    animationObserver.observe(el);
  });

  console.log('🚀 Portfolio loaded successfully!');
  console.log('💼 John Jayasingh S - Senior Developer');
  console.log('📧 johnjayasingh.s@gmail.com');
});
