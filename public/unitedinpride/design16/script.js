/* ============================================
   United in Pride — Script
   ============================================ */

(function () {
  'use strict';

  /* --- DOM refs --- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = mobileOverlay ? mobileOverlay.querySelectorAll('a') : [];
  const tickerTrack = document.getElementById('tickerTrack');
  const programmeTrack = document.getElementById('programmeTrack');
  const progPrev = document.getElementById('progPrev');
  const progNext = document.getElementById('progNext');
  const amountBtns = document.querySelectorAll('.give-block__amount');

  /* ============================================
     Hamburger Menu Toggle
     ============================================ */
  if (hamburgerBtn && mobileOverlay) {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = mobileOverlay.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileOverlay.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================
     Smooth Scrolling for Nav Links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 70; // account for sticky nav
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     Ticker Duplication for Infinite Scroll
     ============================================ */
  if (tickerTrack) {
    var tickerContent = tickerTrack.innerHTML;
    tickerTrack.innerHTML = tickerContent + tickerContent;
  }

  /* ============================================
     Programme Horizontal Scroll Arrows
     ============================================ */
  var scrollAmount = 260;

  if (progPrev && progNext && programmeTrack) {
    progPrev.addEventListener('click', function () {
      programmeTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    progNext.addEventListener('click', function () {
      programmeTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /* ============================================
     Donation Amount Button Selection
     ============================================ */
  amountBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      amountBtns.forEach(function (b) {
        b.classList.remove('give-block__amount--selected');
      });
      btn.classList.add('give-block__amount--selected');
    });
  });

  /* ============================================
     Scroll Animations (Intersection Observer)
     ============================================ */
  var revealTargets = [
    '.editorial__inner',
    '.programme-card',
    '.give-block__inner',
    '.mosaic__item',
    '.chronicle__event',
    '.voices__stage'
  ];

  // Add reveal class to targets
  revealTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add('reveal');
    });
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

})();
