document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
  
  // Trigger animations for elements already in viewport on load
  setTimeout(() => {
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < window.innerHeight) {
        reveal.classList.add('visible');
      }
    });
  }, 100);
});
