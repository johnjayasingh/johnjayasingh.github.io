// Modern Portfolio TypeScript
document.addEventListener('DOMContentLoaded', function(): void {
  // Mobile Navigation Toggle
  const mobileMenu = document.getElementById('mobile-menu') as HTMLElement;
  const navMenu = document.getElementById('nav-menu') as HTMLElement;
  const navLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLAnchorElement>;

  // Toggle mobile menu
  mobileMenu?.addEventListener('click', function(): void {
    navMenu?.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = mobileMenu.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
    bars.forEach((bar: HTMLElement, index: number) => {
      if (navMenu?.classList.contains('active')) {
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
  navLinks.forEach((link: HTMLAnchorElement) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
      const bars = mobileMenu?.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
      bars?.forEach((bar: HTMLElement) => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
      });
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link: HTMLAnchorElement) => {
    link.addEventListener('click', function(e: Event): void {
      e.preventDefault();
      const targetId = this.getAttribute('href')?.substring(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;
      
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
  window.addEventListener('scroll', function(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll('section') as NodeListOf<HTMLElement>;
  
  function highlightActiveSection(): void {
    let current = '';
    sections.forEach((section: HTMLElement) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link: HTMLAnchorElement) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);

  // Intersection Observer for fade-in animations
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .education-item, .highlight-item') as NodeListOf<HTMLElement>;
  animateElements.forEach((el: HTMLElement) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Typing animation for hero text
  function typeWriter(element: HTMLElement, text: string, speed: number = 100): void {
    let i = 0;
    element.innerHTML = '';
    
    function type(): void {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Initialize typing animation
  const heroSubtitle = document.querySelector('.hero-subtitle') as HTMLElement;
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent || '';
    setTimeout(() => {
      typeWriter(heroSubtitle, originalText, 50);
    }, 1000);
  }

  // Skill item hover effects
  const skillItems = document.querySelectorAll('.skill-item') as NodeListOf<HTMLElement>;
  skillItems.forEach((item: HTMLElement) => {
    item.addEventListener('mouseenter', function(): void {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function(): void {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Timeline item stagger animation
  const timelineItems = document.querySelectorAll('.timeline-item') as NodeListOf<HTMLElement>;
  timelineItems.forEach((item: HTMLElement, index: number) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', function(): void {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero') as HTMLElement;
    const heroContent = document.querySelector('.hero-content') as HTMLElement;
    
    if (hero && heroContent && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Contact form validation (if you add a form later)
  const contactForm = document.getElementById('contact-form') as HTMLFormElement;
  if (contactForm) {
    contactForm.addEventListener('submit', function(e: Event): void {
      e.preventDefault();
      
      // Basic form validation
      const email = this.querySelector('input[type="email"]') as HTMLInputElement;
      const message = this.querySelector('textarea') as HTMLTextAreaElement;
      
      if (!email?.value || !message?.value) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Here you would typically send the form data to a server
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.reset();
    });
  }

  // Smooth reveal animations for cards
  const cards = document.querySelectorAll('.profile-card, .info-card, .contact-item') as NodeListOf<HTMLElement>;
  cards.forEach((card: HTMLElement) => {
    card.addEventListener('mouseenter', function(): void {
      this.style.transform = this.style.transform.replace('scale(1)', 'scale(1.02)');
    });
    
    card.addEventListener('mouseleave', function(): void {
      this.style.transform = this.style.transform.replace('scale(1.02)', 'scale(1)');
    });
  });

  // Copy email to clipboard functionality
  const emailElements = document.querySelectorAll('[href^="mailto:"]') as NodeListOf<HTMLAnchorElement>;
  emailElements.forEach((element: HTMLAnchorElement) => {
    element.addEventListener('click', function(e: Event): void {
      e.preventDefault();
      const email = this.getAttribute('href')?.replace('mailto:', '') || '';
      
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
        window.location.href = this.getAttribute('href') || '';
      }, 1000);
    });
  });

  // Show notification function
  function showNotification(message: string): void {
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
  let konamiCode: number[] = [];
  const konamiSequence: number[] = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
  
  document.addEventListener('keydown', function(e: KeyboardEvent): void {
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
  function throttle(func: Function, wait: number): Function {
    let timeout: number | undefined;
    return function executedFunction(...args: any[]): void {
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

  window.addEventListener('scroll', throttledScrollHandler as EventListener);

  // Initialize AOS (Animate On Scroll) alternative
  function initScrollAnimations(): void {
    const elements = document.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
    
    elements.forEach((element: HTMLElement) => {
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
  const animationObserver = new IntersectionObserver(function(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) translateX(0)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
  }, observerOptions);

  // Re-observe elements with the new observer
  const customAnimateElements = document.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
  customAnimateElements.forEach((el: HTMLElement) => {
    animationObserver.observe(el);
  });

  console.log('🚀 Portfolio loaded successfully!');
  console.log('💼 John Jayasingh S - Senior Developer');
  console.log('📧 johnjayasingh.s@gmail.com');
});
