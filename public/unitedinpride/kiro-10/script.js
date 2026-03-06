/* ============================================
   UNITED IN PRIDE — BRUTALIST CHIC — JS
   ============================================ */

(function () {
  'use strict';

  // --- DOM READY ---
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileNav();
    initSmoothScroll();
    initIntersectionObserver();
    initTestimonials();
    initDonation();
    initNewsletter();
    initProgressBar();
    initStatCounters();
  }

  /* ============================================
     MOBILE NAVIGATION
     ============================================ */
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================
     SMOOTH SCROLL
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var navHeight = document.querySelector('.main-nav').offsetHeight || 64;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ============================================
     INTERSECTION OBSERVER — FADE IN
     ============================================ */
  function initIntersectionObserver() {
    var fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     STAT COUNTERS
     ============================================ */
  function initStatCounters() {
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    var counted = false;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounters(statNumbers);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    var statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
  }

  function animateCounters(elements) {
    elements.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(step);
    });
  }

  /* ============================================
     PROGRESS BAR
     ============================================ */
  function initProgressBar() {
    var fill = document.getElementById('progressFill');
    if (!fill) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var percent = fill.getAttribute('data-percent') || 65;
          fill.style.width = percent + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(fill);
  }

  /* ============================================
     TESTIMONIALS
     ============================================ */
  function initTestimonials() {
    var slides = document.querySelectorAll('.testimonial-slide');
    var prevBtn = document.getElementById('testimonialPrev');
    var nextBtn = document.getElementById('testimonialNext');
    var currentDisplay = document.getElementById('currentSlide');
    var totalDisplay = document.getElementById('totalSlides');

    if (!slides.length || !prevBtn || !nextBtn) return;

    var currentIndex = 0;
    var total = slides.length;

    if (totalDisplay) totalDisplay.textContent = total;

    function showSlide(index) {
      slides.forEach(function (s) { s.classList.remove('active'); });
      currentIndex = (index + total) % total;
      slides[currentIndex].classList.add('active');
      if (currentDisplay) currentDisplay.textContent = currentIndex + 1;
    }

    prevBtn.addEventListener('click', function () {
      showSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
      showSlide(currentIndex + 1);
    });

    // Auto-rotate every 8 seconds
    var autoRotate = setInterval(function () {
      showSlide(currentIndex + 1);
    }, 8000);

    // Pause auto-rotate on interaction
    [prevBtn, nextBtn].forEach(function (btn) {
      btn.addEventListener('click', function () {
        clearInterval(autoRotate);
      });
    });
  }

  /* ============================================
     DONATION
     ============================================ */
  function initDonation() {
    var amountBtns = document.querySelectorAll('.amount-btn');
    var customInput = document.getElementById('customAmount');
    var donateCta = document.getElementById('donateCta');

    if (!amountBtns.length) return;

    var selectedAmount = 100;

    amountBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        amountBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        selectedAmount = parseInt(btn.getAttribute('data-amount'), 10);
        if (customInput) customInput.value = '';
      });
    });

    if (customInput) {
      customInput.addEventListener('input', function () {
        if (this.value) {
          amountBtns.forEach(function (b) { b.classList.remove('active'); });
          selectedAmount = parseInt(this.value, 10) || 0;
        }
      });

      customInput.addEventListener('focus', function () {
        amountBtns.forEach(function (b) { b.classList.remove('active'); });
      });
    }

    if (donateCta) {
      donateCta.addEventListener('click', function () {
        var amount = customInput && customInput.value ? parseInt(customInput.value, 10) : selectedAmount;
        if (!amount || amount <= 0) {
          alert('Please select or enter a donation amount.');
          return;
        }
        alert('Thank you for your generous donation of $' + amount.toLocaleString() + '! Your support makes a real difference in our community.');
      });
    }
  }

  /* ============================================
     NEWSLETTER
     ============================================ */
  function initNewsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        alert('SUBSCRIBED. Welcome to the community, ' + input.value + '.');
        input.value = '';
      }
    });
  }

})();
