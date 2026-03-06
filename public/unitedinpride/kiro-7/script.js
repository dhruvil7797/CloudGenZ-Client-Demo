/* ===== United in Pride — Aurora Borealis Theme ===== */
(function () {
  'use strict';

  /* --- Hamburger & Overlay Menu --- */
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlayMenu');
  const overlayLinks = overlay.querySelectorAll('.overlay-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- Side Dot Navigation (Intersection Observer) --- */
  const dots = document.querySelectorAll('.side-dots .dot');
  const sectionIds = Array.from(dots).map(d => d.dataset.section);
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const observerOpts = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 };

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        const active = document.querySelector(`.dot[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, observerOpts);

  sections.forEach(s => sectionObserver.observe(s));

  /* --- Smooth Scroll for Dot Nav --- */
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* --- Scroll Reveal Animation --- */
  const revealEls = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* --- Banner Text Duplication for Infinite Scroll --- */
  const bannerTrack = document.getElementById('bannerTrack');
  if (bannerTrack) {
    const original = bannerTrack.querySelector('.banner-text');
    if (original) {
      const clone = original.cloneNode(true);
      bannerTrack.appendChild(clone);
    }
  }

  /* --- Donation Amount Selection --- */
  const amountBtns = document.querySelectorAll('.amount-btn');
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  /* --- Testimonial Pagination --- */
  const tSlides = document.querySelectorAll('.testimonial-slide');
  const tDots = document.querySelectorAll('.t-dot');

  function showTestimonial(index) {
    tSlides.forEach(s => s.classList.remove('active'));
    tDots.forEach(d => d.classList.remove('active'));
    if (tSlides[index]) tSlides[index].classList.add('active');
    if (tDots[index]) tDots[index].classList.add('active');
  }

  tDots.forEach(dot => {
    dot.addEventListener('click', () => {
      showTestimonial(parseInt(dot.dataset.index, 10));
    });
  });

  // Auto-rotate testimonials every 6 seconds
  let currentTestimonial = 0;
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % tSlides.length;
    showTestimonial(currentTestimonial);
  }, 6000);

  /* --- Events Horizontal Scroll Snap (keyboard support) --- */
  const eventsScroll = document.getElementById('eventsScroll');
  if (eventsScroll) {
    // Allow arrow key scrolling when focused
    eventsScroll.setAttribute('tabindex', '0');
    eventsScroll.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        eventsScroll.scrollBy({ left: 320, behavior: 'smooth' });
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        eventsScroll.scrollBy({ left: -320, behavior: 'smooth' });
        e.preventDefault();
      }
    });
  }
})();
