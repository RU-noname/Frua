/* ===========================
   ANIMATIONS JAVASCRIPT
   Handles scroll animations, interactions, and effects
   =========================== */

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initProductCardAnimations();
  initSmoothScroll();
  initToastAnimations();
  initParallax();
  initFAQAnimations();
  initRippleEffect();
  initInputAnimations();
  initScrollProgressBar();
  initNavbarScrollEffect();
});

// ===== SCROLL REVEAL ANIMATIONS =====

/**
 * Initialize Intersection Observer for scroll-based animations
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class based on element type
        if (entry.target.classList.contains('adv-card')) {
          entry.target.classList.add('animate-in');
        }
        if (entry.target.classList.contains('review-card')) {
          entry.target.classList.add('animate-in');
        }
        if (entry.target.classList.contains('product-card')) {
          entry.target.classList.add('animate-in');
        }
        if (entry.target.classList.contains('faq-item')) {
          entry.target.classList.add('animate-in');
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.adv-card, .review-card, .product-card, .faq-item').forEach(el => {
    observer.observe(el);
  });
}

// ===== PRODUCT CARD ANIMATIONS =====

/**
 * Add interactive animations to product cards
 */
function initProductCardAnimations() {
  document.addEventListener('mouseover', function(e) {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      productCard.style.animation = 'none';
      // Trigger reflow to restart animation if needed
      void productCard.offsetWidth;
    }
  });
}

// ===== SMOOTH SCROLL =====

/**
 * Smooth scroll navigation
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ===== TOAST ANIMATIONS =====

/**
 * Enhanced toast notification with animations
 */
function initToastAnimations() {
  // This works with the showToast function in script.js
  // The toast will automatically have animation from CSS
}

// ===== PARALLAX EFFECT =====

/**
 * Add parallax scrolling effect to hero section
 */
function initParallax() {
  const heroSection = document.querySelector('.hero-bg');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const yOffset = scrolled * 0.5; // Parallax speed
      
      heroSection.style.backgroundPosition = `0 ${yOffset}px`;
    });
  }
}

// ===== CART ANIMATIONS =====

/**
 * Animate cart count badge when item added
 */
function animateCartBadge() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.style.animation = 'none';
    void cartCount.offsetWidth; // Trigger reflow
    cartCount.style.animation = 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }
}

// Override saveCart to add badge animation
const originalSaveCart = window.saveCart;
if (originalSaveCart) {
  window.saveCart = function() {
    originalSaveCart.call(this);
    animateCartBadge();
  };
}

// ===== FAQ ANIMATIONS =====

/**
 * Add animations to FAQ items
 */
function initFAQAnimations() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    // Add animation when opening
    item.addEventListener('toggle', function() {
      if (this.open) {
        // Opening animation
        this.style.animation = 'none';
        void this.offsetWidth;
        const pTag = this.querySelector('p');
        if (pTag) {
          pTag.style.animation = 'accordionOpen 0.4s ease-out';
        }
      }
    });
  });
}

// ===== BUTTON RIPPLE EFFECT =====

/**
 * Add ripple effect to buttons on click
 */
function initRippleEffect() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      // Clean up previous ripple
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// ===== INPUT FOCUS ANIMATIONS =====

/**
 * Add focus animations to inputs
 */
function initInputAnimations() {
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'scale(1.02)';
      this.style.boxShadow = '0 0 15px rgba(139, 90, 43, 0.2)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });
}

// ===== SCROLL PROGRESS BAR =====

/**
 * Create and animate scroll progress bar
 */
function initScrollProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b5a2b, #d4a574);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
  });
}

// ===== NAVBAR SCROLL EFFECT =====

/**
 * Add shadow effect to navbar on scroll
 */
function initNavbarScrollEffect() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;
  
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if (scrollTop > 50) {
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.boxShadow = '';
      navbar.style.backdropFilter = '';
    }
    
    lastScrollTop = scrollTop;
  });
}

// ===== COUNTER ANIMATION =====

/**
 * Animate number counters
 */
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== PAGE TRANSITION ANIMATIONS =====

/**
 * Add page transition animations when navigating
 */
function initPageTransitions() {
  const links = document.querySelectorAll('a:not([href^="#"]):not([href^="http"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only apply transition for internal links
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        
        // Add exit animation
        const body = document.body;
        body.style.animation = 'pageExit 0.5s ease-out forwards';
        
        // Navigate after animation
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });
}

// Initialize page transitions
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPageTransitions);
} else {
  initPageTransitions();
}

// ===== UTILITY FUNCTIONS =====

/**
 * Trigger animation on element
 */
function triggerAnimation(element, animationName, duration = 600) {
  element.style.animation = 'none';
  void element.offsetWidth; // Trigger reflow
  element.style.animation = `${animationName} ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Wait for element to appear in viewport then execute callback
 */
function whenInViewport(selector, callback) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(element);
}

// Export functions for external use
window.animationUtils = {
  triggerAnimation,
  isInViewport,
  whenInViewport
};
