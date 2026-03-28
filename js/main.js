/* ============================================================
   main.js — Scroll Reveal · Skill Bars · Stat Counters · Mobile Nav
   ============================================================ */

(function () {

  /* ---- MOBILE HAMBURGER NAV ---- */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });


  /* ---- STAT COUNTER ANIMATION ---- */
  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1800;        // ms
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + (el.closest('.stat') ? '' : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + '+';
    }

    requestAnimationFrame(step);
  }

  var countersAnimated = false;

  function tryAnimateCounters() {
    if (countersAnimated) return;
    // Fire when hero is in view (page load for most users)
    document.querySelectorAll('.stat-num[data-count]').forEach(function (el) {
      animateCounter(el);
    });
    countersAnimated = true;
  }

  // Trigger counters after first visible moment
  setTimeout(tryAnimateCounters, 1800); // after hero animations


  /* ---- INTERSECTION OBSERVER: REVEAL + SKILL BARS + TIMELINE ---- */
  var revealElements = document.querySelectorAll('.reveal, .tl-item');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, idx) {
      if (entry.isIntersecting) {
        var el = entry.target;

        // Stagger delay based on sibling position
        var siblings = Array.from(el.parentElement.children);
        var pos       = siblings.indexOf(el);
        var delay     = pos * 70;

        setTimeout(function () {
          el.classList.add('visible');

          // Animate skill bars inside this element
          el.querySelectorAll('.bar[data-w]').forEach(function (bar) {
            setTimeout(function () {
              bar.style.width = bar.getAttribute('data-w') + '%';
            }, 350);
          });

        }, delay);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });


  /* ---- ACTIVE NAV HIGHLIGHT ON SCROLL ---- */
  var sections  = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navAnchors.forEach(function (a) {
          a.style.color = (a.getAttribute('href') === '#' + id)
            ? 'var(--neon)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (s) { navObserver.observe(s); });


  /* ---- SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
